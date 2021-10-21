import * as React from 'react';
import { Form, Input, InputNumber } from "antd";
import "./index.css";
import { QuestionNumber } from "../../components/QuestionNumbers";

const Quizzes = (props) => {

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

    autoComplete="off"
  >

    <p className="maintext">
        <span className="text-highlight">Quiz {props.quizno}</span>
      </p>
      <hr />

      <Form.Item
        label="Quiz Description"
        name="quiz_description"
        rules={[
          {
            required: true,
            message: 'Empty! Please input quiz description!',
          },
          {
            whitespace: true,
            message: 'Quiz Description cannot be a whitespace',
          },
        ]}
      >
        <Input placeholder="Enter Quiz Description" />
      </Form.Item>

      <Form.Item
        label="Duration (In Seconds)"
        name="Duration (In Seconds)"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber min={1} max={3600} defaultValue={1}/> 
      </Form.Item>

      <div>
      <QuestionNumber qnNumber = {props.NumberofQns}/>
      </div>

    </Form>
  )
}

export { Quizzes };


