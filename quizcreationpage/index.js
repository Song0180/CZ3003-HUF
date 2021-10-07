import * as React from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Form,  Button} from "antd";
import { QuizNumber } from "../../components/QuizNumbers";
import { Link } from "react-router-dom";
import { LastQuiz } from '../../components/LastQuiz';

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
      <QuizNumber/>
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