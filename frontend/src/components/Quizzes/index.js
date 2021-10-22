import * as React from 'react';
import { Form, Input, InputNumber, message } from "antd";
import "./index.css";
import { QuestionNumber } from "../../components/QuestionNumbers";
import { useGameStore } from '../../services/zustand/game';
import { useAuthStore } from '../../services/zustand/auth';

const Quizzes = (props) => {

  const { createNewQuiz } = useGameStore();
  const { userInfo } = useAuthStore();

  const onFinish = async (values) => {
    const quizData = {
      game_id: userInfo.game_id, //not sure if this is correct, what is the user has more than one game?
      quiz_id: props.quizno,
      quiz_duration: values.quiz_duration,
      quiz_max_score: values.quiz_max_score,
      quiz_description: values.quiz_description,
      no_of_qn: props.NumberofQns,
    };
    const result = await createNewQuiz(quizData);
    if (typeof result == 'string') {
      message.error(result);
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

    <p className="maintext">
        <span className="text-highlight">Quiz {props.quizno}</span>
      </p>
      <p className="qntext">
        <span className="qntext">Level of Difficulty: {props.quizno}</span>
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
        label="Duration (In Minutes): "
        name="quiz_duration:"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber min={1} max={60} defaultValue={1}/> 
      </Form.Item>

      <Form.Item
        label="Total Quiz Score: "
        name="quiz_max_score:"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber min={props.NumberofQns} max={props.NumberofQns} defaultValue={props.NumberofQns}/> 
      </Form.Item>

      <div>
      <QuestionNumber qnNumber = {props.NumberofQns} quiz_id = {props.quizno}/>
      </div>

    </Form>
  )
}

export { Quizzes };


