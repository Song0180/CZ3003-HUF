import * as React from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Form,  Button } from "antd";
import { QuizNumber } from "../../components/QuizNumbers";
import { Pop } from '../../components/Popup';
import { Link, useHistory } from "react-router-dom";
import cx from 'classnames';

const QuizCreationPage = ({ location }) => {
  const history = useHistory();
  const onFinish = (values) => {
    console.log("Success:", values);
    history.push("dashboard/editquiz");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleOnOk = () => {
    console.log("Clicked")
    history.push('/dashboard')
  }

  const gameData = React.useMemo(
    () => location.state.gameData,
    [location.state.gameData]
  );

  return (
    <div className="creation-page-container">
    <div className="creation-page-header-container">
    <h2 className='creation-page-heading' >
      {gameData.game_name.toUpperCase()}
      {/* CLOCKWORKS */}
    </h2>    
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
      <QuizNumber quizNumber = {gameData.no_of_quiz} NumberofQns = {gameData.no_of_quiz}/>
      {/* <QuizNumber quizNumber = {"3"} NumberofQns = {"5"}/> */}
      </div>
      <hr />

      <div className='button'>
      <Button
        type='primary'
        htmlType='Back'
        className={cx('backBtn', 'creation-pagenav-buttons')}
      >
        <Link to={'/gamecreation'}>Back</Link>
      </Button>
      <div className="button">
        <Form.Item>
          <Pop btnName='Submit' title='Save Confirmation' desc='Submit All Quizzes?' onOk={handleOnOk}/>
        </Form.Item>
        </div>
    </div>
    </Form>
    </div>
    </div>
  );
};
export default QuizCreationPage;
