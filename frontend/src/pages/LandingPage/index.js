import * as React from 'react';

import { Form, Input, Button, Checkbox, Card, Tabs } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  FacebookFilled,
} from '@ant-design/icons';
import { useAuthStore } from '../../services/zustand/auth';

import './index.css';

const { TabPane } = Tabs;

const LandingPage = () => {
  const { login } = useAuthStore();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    login(values.mail, values.password);
  };

  return (
    <div className='site-card-wrapper'>
      <Card
        title='Profile'
        bordered={true}
        className='login-card'
        headStyle={{ fontSize: 24, color: '#ff8a00', fontWeight: 'bold' }}
      >
        <Tabs defaultActiveKey='1'>
          <TabPane tab='Sign In' key='1'>
            <Form
              name='normal_login'
              className='login-form'
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name='mail'
                rules={[
                  {
                    required: true,
                    message: 'Please input your mail!',
                  },
                ]}
              >
                <Input
                  className='login-input'
                  prefix={<MailOutlined className='site-form-item-icon' />}
                  placeholder='E-Mail'
                />
              </Form.Item>
              <Form.Item
                name='password'
                rules={[
                  {
                    required: true,
                    message: 'Please input your Password!',
                  },
                ]}
              >
                <Input
                  className='login-input'
                  prefix={<LockOutlined className='site-form-item-icon' />}
                  type='password'
                  placeholder='Password'
                />
              </Form.Item>

              <Form.Item name='remember' valuePropName='checked' noStyle>
                <Checkbox className='login-form-checkbox'>
                  Keep me signed in
                </Checkbox>
              </Form.Item>
              <Form.Item>
                <div className='login-form-forgot'>Forgot password</div>
              </Form.Item>

              <Form.Item>
                <div className='login-button-container'>
                  <Button
                    type='primary'
                    shape='round'
                    htmlType='submit'
                    className='login-form-button'
                  >
                    Sign in
                  </Button>
                  or
                  <Button
                    type='primary'
                    shape='round'
                    icon={<FacebookFilled />}
                    htmlType='submit'
                    className='fb-login-form-button'
                  >
                    Sign in with Facebook
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab='Register' key='2'>
            <Form
              name='normal_login'
              className='login-form'
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name='Name'
                rules={[
                  {
                    required: true,
                    message: 'Please Enter your Name!',
                  },
                ]}
              >
                <Input
                  className='login-input'
                  prefix={<UserOutlined className='site-form-item-icon' />}
                  placeholder='Name'
                />
              </Form.Item>

              <Form.Item
                name='mail'
                rules={[
                  {
                    required: true,
                    message: 'Please Enter your E-Mail!',
                  },
                ]}
              >
                <Input
                  className='login-input'
                  prefix={<MailOutlined className='site-form-item-icon' />}
                  placeholder='E-Mail'
                />
              </Form.Item>
              <Form.Item
                name='password'
                rules={[
                  {
                    required: true,
                    message: 'Please Enter your Password!',
                  },
                ]}
              >
                <Input
                  className='login-input'
                  prefix={<LockOutlined className='site-form-item-icon' />}
                  type='password'
                  placeholder='Password'
                />
              </Form.Item>
              <Form.Item
                name='password'
                rules={[
                  {
                    required: true,
                    message: 'Reconfirm your Password!',
                  },
                ]}
              >
                <Input
                  className='login-input'
                  prefix={<LockOutlined className='site-form-item-icon' />}
                  type='password'
                  placeholder='Reconfirm Password'
                />
              </Form.Item>
              <Form.Item name='remember' valuePropName='checked' noStyle>
                <Checkbox className='login-form-checkbox'>
                  I accept the terms and the privacy policy
                </Checkbox>
              </Form.Item>

              <Form.Item>
                <div className='login-button-container'>
                  <Button
                    type='primary'
                    shape='round'
                    htmlType='submit'
                    className='login-form-button'
                  >
                    Register
                  </Button>
                  <span>or</span>
                  <Button
                    type='primary'
                    shape='round'
                    icon={<FacebookFilled />}
                    htmlType='submit'
                    className='fb-login-form-button'
                  >
                    Register with Facebook
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default LandingPage;
