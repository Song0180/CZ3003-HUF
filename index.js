import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Form, Input, Button, InputNumber } from "antd";
import { Link } from "react-router-dom";


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
      <p className="text">
        <span className="text-highlight"> ----------------------------------------------------------------------------------------------- </span>
      </p>
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

      <p className="qntext">
        <span className="text-highlight">Question 1</span>
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

        <div className="button">
            <Button type="primary" htmlType="Back" className="backBtn">
              <Link to={"/gamecreation"}>Back</Link>
            </Button>
            <Form.Item>
              <Button type="primary" htmlType="Submit" className="nextBtn">
                <Link to={"/editquiz"}>Next</Link>
              </Button>
            </Form.Item>
          </div>
    </Form>
    </div>
    </div>
  );
};
export default quizcreationpage;
