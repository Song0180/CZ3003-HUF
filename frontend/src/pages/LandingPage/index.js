import * as React from 'react';
import FacebookLogin from 'react-facebook-login';

import { Form, Input, Button, Checkbox, Card, Tabs, message } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  FacebookFilled,
} from '@ant-design/icons';
import { useAuthStore } from '../../services/zustand/auth';

import './index.css';
import { resolveOnChange } from 'antd/lib/input/Input';

const { TabPane } = Tabs;

const LandingPage = () => {
  const { login, register } = useAuthStore();
  const [activeTabKey, setActiveTabKey] = React.useState('1');

  const onFinishLogin = async (values) => {
    const result = await login(values.username, values.password);
    if (typeof result === 'string') {
      message.error(
        'Login failed. Please check your credentials and try again.'
      );
    } else if (result) {
      message.success(`Welcome, ${result.username}.`);
    }
  };



  // fbResponse = (response) => {
  //   console.log("Response from Facebook :", response);
  // }

  // // Facebook Login - Under Progress
  // facebookLogin1 = event => {
  //   console.log("Facebook Login Attempt")
  //   // Get Request
  //   fetch('https://cz3003-huf.herokuapp.com/accounts/facebook/login/', {
  //     mode: 'no-cors',
  //     credentials: 'include',
  //     method: 'GET',
  //     headers: {
  //       // 'Content-Type': 'application/json',
  //       'Content-Type': 'Authorization',
  //       'Access-Control-Allow-Origin': '*',
  //       'Access-Control-Allow-Credentials': 'true',
  //     },
  //   })
  //     // Response 
  //     .then(dataWrappedByPromise => dataWrappedByPromise.text())
  //     .then(function (html) {

  //       // Convert the HTML string into a document object
  //       var parser = new DOMParser();
  //       var doc = parser.parseFromString(html, 'text/html');
  //       console.log(doc)
  //     })
  //     //   .then(
  //     //   data => {
  //     //   return this.facebookLogin2()
  //     // })


  //     // If authenticated -> proceed to Home Page
  //     .catch(error => console.error(error))
  // }

  // facebookLogin2 = event => {
  //   console.log("Get Token")
  //   // Get Request
  //   fetch('https://cz3003-huf.herokuapp.com/rest-auth/token', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     // Response 
  //     .then(response => response.json())
  //     .then(data => { console.log("This is the response :", data) })
  //     // If authenticated -> proceed to Home Page
  //     .catch(error => console.error(error))
  // }

  const responseFacebook=(response)=>{
    console.log(response);
    console.log(response.accessToken);
  }

  const onFinishRegister = async (values) => {
    const result = await register(
      values.email,
      values.username,
      values.password
    );
    if (typeof result === 'string') {
      message.error(result);
    } else {
      setActiveTabKey('1');
      message.success(
        `Welcome, ${result.data.username}! You have successfully registered a new account!`
      );
    }
  };

  return (
    <div className='site-card-wrapper'>
      <Card
        title='Profile'
        bordered={true}
        className='login-card'
        headStyle={{ fontSize: 24, color: '#ff8a00', fontWeight: 'bold' }}
      >
        <Tabs
          activeKey={activeTabKey}
          onTabClick={(key, e) => {
            setActiveTabKey(key);
          }}
        >
          <TabPane tab='Sign In' key='1'>
            <Form
              name='normal_login'
              className='login-form'
              initialValues={{ remember: true }}
              onFinish={onFinishLogin}
            >
              <Form.Item
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
                  {/* <div>*/}
                    <FacebookLogin 
                    appId = "566862107737771"
                    autoLoad = {true}
                    fields = "name,email,picture"
                    callback = {responseFacebook}/>
                  {/* <Button
                    type='primary'
                    shape='round'
                    icon={<FacebookFilled />}
                    href='http://localhost:8000/accounts/facebook/login/'
                    onClick={() => {
                      // facebookLogin2()
                      console.log('clicked');
                    }}
                    className='fb-login-form-button'
                  > */}
                    Sign in with Facebook
                  {/* </Button> */}
                </div>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab='Register' key='2'>
            <Form
              name='normal_login'
              className='login-form'
              onFinish={onFinishRegister}
            >
              <Form.Item
                name='username'
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
                />
              </Form.Item>

              <Form.Item
                name='email'
                rules={[
                  {
                    type: 'email',
                    message: 'Please enter a valid email address.',
                  },
                  {
                    required: true,
                    message: 'Please enter your email address!',
                  },
                ]}
              >
                <Input
                  name='email'
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
                  {
                    min: 8,
                    message: 'Password must have at least 8 characters',
                  },
                ]}
              >
                <Input
                  name='password'
                  className='login-input'
                  prefix={<LockOutlined className='site-form-item-icon' />}
                  type='password'
                  placeholder='Password'
                />
              </Form.Item>

              <Form.Item
                name='reconfirmPassword'
                rules={[
                  {
                    required: true,
                    message: 'Reconfirm your Password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error('The two passwords entered do not match!')
                      );
                    },
                  }),
                ]}
              >
                <Input
                  name='reconfirmPassword'
                  className='login-input'
                  prefix={<LockOutlined className='site-form-item-icon' />}
                  type='password'
                  placeholder='Reconfirm Password'
                />
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
                    className='fb-login-form-button'
                    onClick={() => {
                      console.log('clicked');
                    }}
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
