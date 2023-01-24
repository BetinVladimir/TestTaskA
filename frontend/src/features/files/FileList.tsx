import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import backend from '../../services/Backend'

interface DataType {
    date: string
    fileName: string
    id:string
    size: string
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Id',
        key: 'id',
        dataIndex: 'id'
    },
    {
        title: 'Name',
        dataIndex: 'fileName',
        key: 'fileName',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'Size',
        dataIndex: 'size',
        key: 'size',
    },
    {
        title: 'Link',
        key: 'link',
        render: (_, record) => (
            <a href={`${backend.url}/file/${record.id}`} download="w3logo" target="_blank">download</a>
        ),
    },
];



export const FileList = (props: {files: DataType[]}) => {
    return <Table columns={columns} dataSource={props.files} />
};