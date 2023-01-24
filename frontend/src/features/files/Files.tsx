import React, { useCallback, useEffect, useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Layout, message, Space, Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import backend from '../../services/Backend'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { selectToken, signin } from '../../app/appSlice';
import { FileList } from './FileList'


const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };
  
const beforeUpload = (file: RcFile) => {
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      message.error('Image must smaller than 5MB!');
    }
    return isLt2M;
};
  
export const Files: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();
    const token = useAppSelector(selectToken);
    const dispatch = useAppDispatch();
  
    const [files, setFiles] = useState([])

    const uploadFiles = useCallback(async () => {
        if (token) {
            const files = await backend.files(token)

            console.log(files)

            if (files.message === 'Unauthorized') {
                dispatch(signin())
            } else {
                setFiles(files.files)
            }
        }
    }, [token])

    useEffect(()=>{
        uploadFiles()
    }, [])

    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
      if (info.file.status === 'uploading') {
        setLoading(true);
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj as RcFile, (url) => {
          setLoading(false);
          setImageUrl(url);
        });
        uploadFiles()
      }
    };
  
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

    const { Header, Footer, Sider, Content } = Layout;
  
    return (
        <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
            <Layout>
                <Content style={{ padding: '16px' }} >
                    <Upload
                        name="file"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action={`${backend.url}/file`}
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                        headers={{ Authorization: `Bearer ${token}` }}
                    >
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                </Content>
                <Content><FileList files={files}/></Content>
            </Layout>
        </Space>
    );
  };