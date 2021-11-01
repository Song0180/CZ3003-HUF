import * as React from 'react';
import { Radio, Space, Row, Button, Alert } from 'antd';
import 'antd/dist/antd.css';
import './index.css';
import { useState } from 'react';

/*
function to display the questions in the quiz and return the marks gotten (currenty not done)
 */

const GameplayDisplay = ({
  quizQuestions = [],
  currentAnswers = {},
  onAnswerQuestion,
}) => {
  var ansValue = 0;
  var totalScore = 0;
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
  // function checkOptions (){
  //   // Check if all options are filled else throw a warning message "Not all questions are answered."
    
  // }

  function AddValue() {
    ansValue = ansValue + 1;
  }

  function ComputeScore(correct, chosen, score) {
    console.log('Question: ' + ansValue)
    console.log('correct: '+ correct); // can get correct answer
    if (chosen){
      console.log('chosen: '+ chosen.option_id); // get back object with object_id and option, but only want the option user chose
    }
    
    console.log('score: '+score); // can get score per qn
    if (correct === chosen){
      totalScore = score + totalScore;
      console.log(totalScore)
    }
    return totalScore;
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
      <div>
      {quizQuestions.forEach((quiz_qn_id) => {
        <div key={quiz_qn_id.value} value={quiz_qn_id}>
          {AddValue()}
          {ComputeScore(
            quiz_qn_id.correct_ans,
            currentAnswers[ansValue],
            quiz_qn_id.score_per_qn,
          )}
        </div>;
      })}
      {console.log('total: ' +totalScore)}
      </div>
      <div className='button-container'>
        <Button onClick ={ComputeScore}
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
