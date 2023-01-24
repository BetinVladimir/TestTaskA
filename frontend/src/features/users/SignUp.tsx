import React, { useCallback, useState } from 'react';
import { Button, Typography, Form, Input, Space } from 'antd';
import { useAppDispatch } from '../../app/hooks';
import { accessToken, signin } from '../../app/appSlice';
import backend from '../../services/Backend'

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const SignUp: React.FC = () => {
    const dispatch = useAppDispatch();

    const signIn = useCallback(() => {
        dispatch(signin())
    }, [dispatch])

    const [error, setError] = useState<string>('')

    const { Text } = Typography;

    const onFinish = useCallback(async (values: {email: string, password: string}) => {
        // SignUp
        try {
            const result = await backend.signUp(values.email, values.password)
            dispatch(accessToken(result.access_token))
        } catch (err) {
            setError('Error')
        }
        
    }, [dispatch])

    return (
    <Form
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
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space wrap>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                <Button type="link" onClick={signIn}>
                    Sign in
                </Button>
            </Space>
        </Form.Item>
        {error && (<Text type="warning">{error}</Text>)}
    </Form>
    )
};

export default SignUp;