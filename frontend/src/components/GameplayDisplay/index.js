import * as React from 'react';
import { Radio, Space, Row, Button, Form, message } from 'antd';
import 'antd/dist/antd.css';
import './index.css';
import { useGameStore } from '../../services/zustand/game';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import { useAuthStore } from '../../services/zustand/auth';

/*
function to display the questions in the quiz and return the marks gotten (currenty not done)
 */

const GameplayDisplay = ({
  quizQuestions = [],
  currentAnswers = {},
  onAnswerQuestion,
  onFinishQuiz,
}) => {
  const { postUserScore } = useGameStore();
  const history = useHistory();
  const { quiz_id } = useParams();
  const { userInfo } = useAuthStore();
  const currentquizid = Number(quiz_id);

  // sets user's answers to the new option they click
  const handleOnChangeQuestionAnswer = (questionId, answerValue) => {
    const newAnswers = { ...currentAnswers };
    newAnswers[questionId] = answerValue;
    onAnswerQuestion(newAnswers);
  };

  // computes score when quiz is finished
  const onFinish = async (values) => {
    var userscore = onFinishQuiz();
    const gameData = {
      quiz_id: currentquizid,
      user_id: userInfo.userid,
      score_earned: userscore,
      duration_taken: 2,
    };

    const result = await postUserScore(gameData);
    if (typeof result !== 'string') {
      message.success(`Completed.`);
      history.push({
        pathname: `/leaderboard/${result.quiz_id}`,
        state: { gameData },
      });
    } else {
      message.error('You have completed this quiz.');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='question-container'>
      <Form
        name='answer-questions'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
        initialValues={{
          remember: true,
        }}
      >
        {/*Maps through all the quiz_qn_id and returns the question and options*/}
        {quizQuestions.map((quiz_item, index) => {
          return (
            <Form.Item
              key={quiz_item.quiz_qn_id}
              name={`quiz_question${quiz_item.quiz_qn_id}`}
              rules={[
                {
                  required: true,
                  message: 'Please select an answer!',
                },
              ]}
            >
              <div className='question-container'>
                <Row>
                  <h1>
                    Question {index + 1}) {quiz_item.question_name}
                  </h1>
                </Row>
                <Radio.Group
                  name='radiogroup'
                  onChange={(e) =>
                    handleOnChangeQuestionAnswer(
                      quiz_item.quiz_qn_id,
                      e.target.value
                    )
                  }
                  initialValues={null}
                >
                  <Space direction='vertical'>
                    {quiz_item.options.map((option_item) => {
                      return (
                        <Radio
                          key={quiz_item.quiz_qn_id + option_item.value}
                          value={option_item}
                        >
                          {option_item.option_description}
                        </Radio>
                      );
                    })}
                  </Space>
                </Radio.Group>
              </div>
            </Form.Item>
          );
        })}

        <Form.Item className='button-container'>
          <Button
            type='primary'
            htmlType='submit'
            style={{ background: 'orange', borderColor: 'orange' }}
          >
            Finish Quiz
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export { GameplayDisplay };
