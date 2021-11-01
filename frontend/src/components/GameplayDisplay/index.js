import * as React from 'react';
import { Radio, Space, Row, Button, Alert } from 'antd';
import 'antd/dist/antd.css';
import './index.css';
import { ScoreCalculator } from '../ScoreCalculator';
import { useState } from 'react';

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

  //Shows alert when not all question answered and show an alert
  const [showAlert, setShowAlert] = useState(false)
  const onFinish=(e)=>{
    console.log(e)
    setTimeout(() =>{
      setShowAlert(true)
    }, 2000)
  }
  function checkOptions (){
    // Check if all options are filled else throw a warning message "Not all questions are answered."
    
  }

  return (
    <div className='question-container'>
      {/* error when not all questions are answered but not implemented. */}
      {showAlert &&
      <Alert type='error' message='Not all questions are answered' closable/>} 
      {quizQuestions.map((question_name, quiz_qn_id) => {
        return (
          <div key={quiz_qn_id} className='question-container'>
            <Row>
              <h1>
                Question {quiz_qn_id + 1}) {question_name.question_name}
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
                {question_name.options.map((option_id) => {
                  return (
                    <Radio key={option_id.value} value={option_id}>
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
      {/* {console.log(currentAnswers)} */}
      <div className='button-container'>
        <ScoreCalculator quizQuestions = {quizQuestions} currentAnswers={currentAnswers}/>
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
