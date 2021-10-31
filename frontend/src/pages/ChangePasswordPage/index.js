import * as React from "react";
import { Form, Input, Button } from "antd";

import "./index.css";

const ChangePasswordPage = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    form.resetFields();
    let email = values.email;
    console.log(email);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="changepassword-page-container">
      <h1 id="app-heading">HUF</h1>
      <h3>Change Password?</h3>
      <span>We’ll email you the instructions shortly.</span>
      <br />
      <Form
        form={form}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item name="email" label="Email" rules={[{ type: "email" }]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Send Password Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePasswordPage;
