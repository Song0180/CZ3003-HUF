import * as React from 'react';
import { Form, Input, InputNumber, message} from "antd";
import "./index.css";
import { useGameStore } from '../../services/zustand/game';
import { OptionNumbers } from '../OptionsNumbers';

const Questions = props => {

  const { createNewQuiz } = useGameStore();

  const onFinish = async (values) => {
    const qnData = {
      quiz_qn_id: props.qnno,
      quiz_id: props.quiz_id,
      correct_ans: values.correct_ans,
      question_name: values.question_name,
      score_per_qn: values.score_per_qn,
    };
    const qnResult = await createNewQuiz(qnData);
    if (typeof qnResult == 'string') {
      message.error(qnResult);
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
    <p className="qntext">
        <span className="text-highlight">Question {props.qnno}</span>
      </p>
    <Form.Item
        label="Question"
        name="question_name"
        rules={[
          {
            required: true,
            message: 'Please input question!',
          },
          {
            whitespace: true,
            message: 'Question cannot be a whitespace',
          },
        ]}
      >
        <Input placeholder="Enter Question" />
      </Form.Item>

      <OptionNumbers quiz_qn_id = {props.qnno}/>

      <Form.Item
        label="Correct Answer"
        name="correct_ansr"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber min={1} max={4} defaultValue={1}/> 
      </Form.Item>

      <Form.Item
        label="Score set per Question: "
        name="score_per_qn"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber min={1} max={1} defaultValue={1}/> 
      </Form.Item>
    </Form>
  )
}

export { Questions };
