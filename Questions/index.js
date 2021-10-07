import * as React from 'react';
import { Form, Input, InputNumber} from "antd";
import "./index.css";

const Questions = props => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  console.log(props)
  return (
    <Form
    name="basic"
    labelCol={{
      span: 5,
    }}
    wrapperCol={{
      span: 16,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <p className="qntext">
        <span className="text-highlight">Question {props.qnno}</span>
      </p>
    <Form.Item
        label="Question"
        name="Question"
        rules={[
          {
            required: true,
            message: 'Please input question!',
          },
        ]}
      >
        <Input placeholder="Enter Question" />
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
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber min={1} max={4} defaultValue={1}/> 
      </Form.Item>
    </Form>
  )
}

export { Questions };