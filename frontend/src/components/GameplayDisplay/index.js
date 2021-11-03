import * as React from "react";
import { Radio, Space, Row, Button, Alert } from "antd";
import "antd/dist/antd.css";
import "./index.css";
import { useState } from "react";

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
  const [showAlert, setShowAlert] = useState(false);
  // const onFinish=(e)=>{
  //   console.log(e)
  //   setTimeout(() =>{
  //     setShowAlert(true)
  //   }, 2000)
  // }

  function ComputeScore() {
    var totalScore = 0;
    for (let i = 0; i < 2; i++) {
      console.log(quizQuestions[i].quiz_qn_id);
      console.log(quizQuestions[i].correct_ans);
      console.log(currentAnswers[i + 1].option_id);
      var correctAns = quizQuestions[i].correct_ans;
      var chosen = currentAnswers[i + 1].option_id;
      var score = quizQuestions[i].score_per_qn;
      if (chosen === null) {
        break;
      } else if (correctAns === chosen) {
        totalScore = score + totalScore;
      }
    }
    console.log("totalscore: " + totalScore);
    return totalScore;
  }

  return (
    <div className="question-container">
      {/* error when not all questions are answered but not implemented. */}
      {showAlert && (
        <Alert type="error" message="Not all questions are answered" closable />
      )}
      {quizQuestions.map((question_name, quiz_qn_id) => {
        return (
          <div key={quiz_qn_id} className="question-container">
            <Row>
              <h1>
                Question {quiz_qn_id + 1}) {question_name.question_name}
              </h1>
            </Row>
            <Radio.Group
              name="radiogroup"
              onChange={(e) =>
                handleOnChangeQuestionAnswer(
                  question_name.quiz_qn_id,
                  e.target.value
                )
              }
              defaultValue={null}
            >
              <Space direction="vertical">
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
      <div className="button-container">
        <Button
          onClick={ComputeScore}
          type="primary"
          style={{ background: "orange", borderColor: "orange" }}
        >
          Finish Quiz
        </Button>
      </div>
    </div>
  );
};

export { GameplayDisplay };
