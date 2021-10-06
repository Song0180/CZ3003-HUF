import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Form, Input, Button, InputNumber } from "antd";

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const QuizCreationPage = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 10,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div>
        <h1>
          Quiz 1 <br></br>
        </h1>
      </div>

      <Form.Item
        label="Quiz Description"
        name="Quiz Description"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Enter Quiz 1 Description" />
      </Form.Item>

        <Form.Item
          label="Duration(In Seconds)"
          name="Duration(In Seconds)"
          noStyle
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Enter the Duration for the game in seconds (The maximum amount of time that you can set the game is: 1 Hour" />
          <InputNumber min={1} max={3600} defaultValue={1} onChange={onChange}/> 
        </Form.Item>
      
      <Form.Item
        label="Question 1"
        name="Question 1"
        rules={[
          {
            required: true,
            message: 'Please input question!',
          },
        ]}
      >
        <Input placeholder="Enter Question 1" />
      </Form.Item>

      <Form.Item
        label="Option 1"
        name="Option 1"
        rules={[
          {
            required: true,
            message: 'Empty! Please input first option!',
          },
        ]}
      >
        <Input placeholder="Enter Option 1" />
      </Form.Item>

      <Form.Item
        label="Option 2"
        name="Option 2"
        rules={[
          {
            required: true,
            message: 'Empty! Please input second option!',
          },
        ]}
      >
        <Input placeholder="Enter Option 2" />
      </Form.Item>

      <Form.Item
        label="Option 3"
        name="Option 3"
        rules={[
          {
            required: true,
            message: 'Empty! Please input third option!',
          },
        ]}
      >
        <Input placeholder="Enter Option 3" />
      </Form.Item>

      <Form.Item
        label="Option 4"
        name="Option 4"
        rules={[
          {
            required: true,
            message: 'Empty! Please input fourth option!',
          },
        ]}
      >
        <Input placeholder="Enter Option 4" />
      </Form.Item>

        <Form.Item
          label="Correct Answer"
          name="Correct Answer"
          noStyle
          rules={[
            {
              required: true,
              message: 'Empty! Please input correct answer for the question!',
            },
          ]}
        >
          <Input placeholder="Choose between options 1 to 4 for the correct answer" />
          <InputNumber min={1} max={4} defaultValue={1} onChange={onChange}/> 
        </Form.Item>

      <Form.Item {...tailLayout}>
      <Button htmlType="button" htmlType="back">
          Back
        </Button>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>

    </Form>
  );
};
export default QuizCreationPage;
