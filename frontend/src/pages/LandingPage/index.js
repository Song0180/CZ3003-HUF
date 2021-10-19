import * as React from 'react';
import { Component } from 'react';

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
+class LandingPage extends Component {
  /*
// const LandingPage = () => {

const { login } = useAuthStore();

const onFinish = (values) => {
  console.log('Received values of form: ', values);
  login(values.email, values.password);
};
  */

  loginState = {
    credentials:
      { username: '', password: '' }
  }

  loginInputChanged = event => {
    const cred = this.loginState.credentials;
    cred[event.target.name] = event.target.value;
    this.setState({ credentials: cred });
  }

  registerState = {
    credentials:
      { id: 25, email: '', username: '', password: '', }
  }

  registerInputChanged = event => {
    const cred = this.registerState.credentials;
    cred[event.target.name] = event.target.value;
    this.setState({ credentials: cred });
  }

  // Django Register
  djangoRegister = event => {
    console.log(JSON.stringify(this.registerState.credentials))
    fetch('https://cz3003-huf.herokuapp.com/hufusers/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.registerState.credentials)
    })
      //.then(response => response.json())
      .then(
        data => {
          console.log("This is the response :", data);
        })
      .catch(error => console.error(error))
  }

  // Django Login
  djangoLogin = event => {
    console.log(JSON.stringify(this.loginState.credentials))
    fetch('https://cz3003-huf.herokuapp.com/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.loginState.credentials)
    })
      //.then(response => response.json())
      .then(
        data => {
          console.log("This is the response :", data);
        })
      .catch(error => console.error(error))
  }

  render() {
    return (
      <div className='site-card-wrapper' >
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
              // initialValues={{remember: true,}}
              // onFinish={onFinish}
              ><Form.Item
                name='username'
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                ]}
              >
                  <Input
                    name='username'
                    className='login-input'
                    type='text'
                    prefix={<MailOutlined className='site-form-item-icon' />}
                    placeholder='Username'
                    value={this.loginState.credentials.username}
                    onChange={this.loginInputChanged.bind(this)}
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
                    name='password'
                    className='login-input'
                    prefix={<LockOutlined className='site-form-item-icon' />}
                    type='password'
                    placeholder='Password'
                    value={this.loginState.credentials.password}
                    onChange={this.loginInputChanged.bind(this)}
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
                      // htmlType='submit'
                      className='login-form-button'
                      onClick={this.djangoLogin}
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
              // initialValues={{remember: true, }}
              // onFinish={onFinish}
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
                    name='username'
                    className='login-input'
                    prefix={<UserOutlined className='site-form-item-icon' />}
                    placeholder='Name'
                    value={this.registerState.credentials.username}
                    onChange={this.registerInputChanged.bind(this)}
                  />
                </Form.Item>

                <Form.Item
                  name='email'
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter your E-Mail!',
                    },
                  ]}
                >
                  <Input
                    name='email'
                    className='login-input'
                    prefix={<MailOutlined className='site-form-item-icon' />}
                    placeholder='E-Mail'
                    value={this.registerState.credentials.email}
                    onChange={this.registerInputChanged.bind(this)}
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
                    name='password'
                    className='login-input'
                    prefix={<LockOutlined className='site-form-item-icon' />}
                    type='password'
                    placeholder='Password'
                    value={this.registerState.credentials.password}
                    onChange={this.registerInputChanged.bind(this)}
                  />
                </Form.Item>

                <Form.Item
                  name='reconfirmPassword'
                  rules={[
                    {
                      required: true,
                      message: 'Reconfirm your Password!',
                    },
                  ]}
                >
                  <Input
                    name='reconfirmPassword'
                    className='login-input'
                    prefix={<LockOutlined className='site-form-item-icon' />}
                    type='password'
                    placeholder='Reconfirm Password'
                  // value={this.registerState.credentials.recomfirmPassword}
                  // onChange={this.registerInputChanged.bind(this)}
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
                      onClick={this.djangoRegister}
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
        </Card >
      </div >
    );
  }
};

export default LandingPage;