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
      {quizQuestions.map((question, index) => {
        return (
          <div key={index} className='question-container'>
            <Row>
              <h1>
                Question {index + 1}) {question.question}
              </h1>
            </Row>
            <Radio.Group
              name='radiogroup'
              onChange={(e) =>
                handleOnChangeQuestionAnswer(
                  question.questionId,
                  e.target.value
                )
              }
              defaultValue={null}
            >
              <Space direction='vertical'>
                {question.options.map((option) => {
                  return (
                    <Radio key={option.value} value={option.value}>
                      {option.text}
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
