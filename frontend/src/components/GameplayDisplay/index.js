import * as React from 'react';
import { Radio, Space, Row, Button } from 'antd';
import 'antd/dist/antd.css';
import './index.css';

/*
function to display the questions in the quiz and return the marks gotten (currenty not done)
 */

const GameplayDisplay = ({
  quizQuestions = [],
  currentAnswers = {},
  onAnswerQuestion,
}) => {
  const handleOnChangeQuestionAnswer = (questionId, answerValue) => {
    const newAnswers = { ...currentAnswers };
    newAnswers[questionId] = answerValue;
    onAnswerQuestion(newAnswers);
  };

  return (
    <div className='question-container'>
      {quizQuestions.map((question_name, quiz_qn_id) => {
        return (
          <div key={quiz_qn_id} className='question-container'>
            <Row>
              <h1>
                Question {quiz_qn_id + 1}) {question_name}
              </h1>
            </Row>
            <Radio.Group
              name='radiogroup'
              onChange={(e) =>
                handleOnChangeQuestionAnswer(
                  question_name.quiz_qn_id,
                  e.target.value
                )
              }
              defaultValue={null}
            >
              <Space direction='vertical'>
                {quizQuestions.map((option_id) => {
                  return (
                    <Radio key={option_id.value} value={option_id.value}>
                      {option_id.option_description}
                    </Radio>
                  );
                })}
              </Space>
            </Radio.Group>
          </div>
        );
      })}
      <br />
      <div className='button-container'>
        <Button
          type='primary'
          style={{ background: 'orange', borderColor: 'orange' }}
        >
          Finish Quiz
        </Button>
      </div>
    </div>
  );
};

export { GameplayDisplay };
