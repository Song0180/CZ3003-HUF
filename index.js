import * as React from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Form, Input, Button, InputNumber } from "antd";
import { Link } from "react-router-dom";
import { LastQuiz } from '../../components/LastQuiz';
import { QuestionNumber } from "../../components/QuestionNumbers";

const quizcreationpage = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="creation-page-container">
    <div className="creation-page-header-container">
      <h2 className="creation-page-heading">Clockworks</h2>
    </div>
    <div className="info-container">
      <p className="maintext">
        <span className="text-highlight">Quiz 1</span>
      </p>
      <hr />
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
      <Form.Item
        label="Quiz Description"
        name="Quiz Description"
        rules={[
          {
            required: true,
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
      <QuestionNumber/>
      </div>
      
      <hr />

        <div className="button">
            <Button type="primary" htmlType="Back" className="backBtn">
              <Link to={"/gamecreation"}>Back</Link>
            </Button>
            <LastQuiz />
          </div>
    </Form>
    </div>
    </div>
  );
};
export default quizcreationpage;
