import React, { useCallback, useState } from 'react';
import { Button, Form, Input, Space, Typography } from 'antd';
import { useAppDispatch } from '../../app/hooks';
import { accessToken, signup } from '../../app/appSlice';
import backend from '../../services/Backend'

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

const SignIn: React.FC = () => {
    const dispatch = useAppDispatch();

    const signUp = useCallback(() => {
        dispatch(signup())
    }, [dispatch])

    const [error, setError] = useState<string>('')

    const onFinish = useCallback(async (values: { username: string, password: string }) => {
        // SignUp
        try {
            const result = await backend.signIn(values.username, values.password)
            if (result.access_token) {
                dispatch(accessToken(result.access_token))
            } else {
                setError(result.message ?? 'Error')
            }
        } catch (err) {
            setError('Error')
        }
        return false
    }, [dispatch])

    const { Text } = Typography;

    return (<Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, margin: 'auto' }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
        >
            <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space wrap>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                <Button type="link" onClick={signUp}>
                    Sign up
                </Button>
            </Space>
        </Form.Item>
        {error && (<Text type="warning">{error}</Text>)}
    </Form>)
};

export default SignIn;