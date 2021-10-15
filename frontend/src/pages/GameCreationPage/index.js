import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Form, Input, Button, InputNumber } from "antd";
import { Link } from "react-router-dom";

const GameCreationPage = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="creation-page-container">
      <div className="creation-page-header-container">
        <h2 className="creation-page-heading">Game Creation!</h2>
      </div>
      <div className="info-container">
        <p className="text">
          Hi <span className="text-highlight">James</span>,
        </p>
        <p className="text">
          Please complete the following to proceed with the creation of your
          game.
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
            label="GAME NAME: "
            name="Game Name"
            rules={[
              {
                required: true,
                message: "Please input the Game Name",
              },
              {
                whitespace: true,
                message: "Game Name cannot be a whitespace",
              },
            ]}
          >
            <Input placeholder="Enter name of the Game" />
          </Form.Item>

          <Form.Item
            label="GAME DESCRIPTION"
            name="Game Description"
            rules={[
              {
                required: true,
                message: "Please input the Game Description",
              },
              {
                whitespace: true,
                message: "Game Name cannot be a whitespace",
              },
            ]}
          >
            <Input placeholder="Enter Game Description" />
          </Form.Item>

          <Form.Item
            label="INPUT GAME TAG"
            name="Game Tag"
            rules={[
              {
                required: true,
                message: "Please input the Game Tag",
              },
              {
                max: 20,
                message: "Tags can only have a maximum 20 characters.",
              },
              {
                pattern: "^[^s]+[-a-zA-Zs]+([-a-zA-Z]+)*$",
                message: "Tags cannot contain whitespaces",
              },
            ]}
          >
            <Input placeholder="Enter Game Tag" />
          </Form.Item>

          <Form.Item
            label="NUMBER OF QUIZZES: "
            name="Number of Quizzes"
            rules={[
              {
                required: true,
                message: "Please input the number of quizzes",
              },
            ]}
          >
            <InputNumber defaultValue={1} min={1} max={5} />
          </Form.Item>

          <Form.Item
            label="NUMBER 0F QUESTIONS PER QUIZ: "
            name="Number of Questions"
            rules={[
              {
                required: true,
                message: "Please input the number of questions per quiz",
              },
            ]}
          >
            <InputNumber defaultValue={1} min={1} max={10} />
          </Form.Item>

          <hr />

          <div className="button">
            <Button type="primary" htmlType="Back" className="backBtn">
              <Link to={"/"}>Back</Link>
            </Button>
            <Form.Item>
              <Button type="primary" htmlType="Submit" className="nextBtn">
                {/*To Do: Should only be able to Next when all the fields are validated */}
                <Link to={"/editquiz"}>Next</Link>
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default GameCreationPage;
