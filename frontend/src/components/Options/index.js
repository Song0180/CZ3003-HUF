import * as React from 'react';
import { Form, Input, message} from "antd";
import "./index.css";
import { useGameStore } from '../../services/zustand/game';

const Options = props => {
    const { createNewOptions } = useGameStore();

  const onFinish = async (values) => {

    const optionsData = {
      quiz_qn_id: props.quiz_qn_id,
      option_id: props.optionno,
      option_description: values.option_description,
    };
    const optionsResult = await createNewOptions(optionsData);
    if (typeof optionsResult == 'string') {
      message.error(optionsResult);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

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
    autoComplete='off'
  >

    <Form.Item
      label= {props.label}
      name="option_id"
      rules={[
        {
          required: true,
          message: 'Empty! Please input option!',
        },
        {
          whitespace: true,
          message: 'Option cannot be a whitespace',
        },
      ]}
    >
      <Input placeholder="Enter Option" />
    </Form.Item>
      
    </Form>
  )
}

export { Options };