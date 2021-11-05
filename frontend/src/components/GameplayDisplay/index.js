import * as React from "react";
import { Radio, Space, Row, Button, Form } from "antd";
import "antd/dist/antd.css";
import "./index.css";
// import { useState } from "react";

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
  const onFinish = (e) => {
    ComputeScore();
  };

  function ComputeScore() {
    var totalScore = 0;
    for (let i = 0; i < quizQuestions.length; i++) {
        // console.log(quizQuestions[i].quiz_qn_id);
        console.log(quizQuestions[i].correct_ans);
        // console.log(currentAnswers[i + 1].option_id);
        var correctAns = quizQuestions[i].correct_ans;
        var chosen = currentAnswers[i + 1].option_id;
        var score = quizQuestions[i].score_per_qn;
        if (correctAns === chosen) {
          totalScore = score + totalScore;
        }
      }
      console.log('totalscore: ' + totalScore);
      return totalScore;
    }



  return (
    <div className="question-container">
      <Form
        name="answer-questions"
        onFinish={onFinish}
      >
        {quizQuestions.map((quiz_item, index) => {
          return (
            <div key={quiz_item.quiz_qn_id} className="question-container">
              <Row>
                <h1>
                  Question {index + 1}) {quiz_item.question_name}
                </h1>
              </Row>
              <Radio.Group
                name="radiogroup"
                onChange={(e) =>
                  handleOnChangeQuestionAnswer(
                    quiz_item.quiz_qn_id,
                    e.target.value
                  )
                }
                initialValues={null}
              >
                <Form.Item
                  name="Answer"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Space direction="vertical">
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
                </Form.Item>
              </Radio.Group>
            </div>
          );
        })}

        <Form.Item className="button-container">
          <Button
            type="primary"
            htmlType="submit"
            style={{ background: "orange", borderColor: "orange" }}
          >
            Finish Quiz
          </Button>
        </Form.Item>
      </Form>
    </div>

    // <div className="question-container">
    //   {quizQuestions.map((quiz_item, index) => {
    //     return (
    //       <div key={quiz_item.quiz_qn_id} className="question-container">
    //         <Row>
    //           <h1>
    //             Question {index + 1}) {quiz_item.question_name}
    //           </h1>
    //         </Row>
    //         <Form
    //           name="control-hooks"
    //           onFinish={onFinish}
    //           onFinishFailed={onFinishFailed}
    //         >
    //           <Form.Item
    //             name="Answer"
    //             rules={[
    //               {
    //                 required: true,
    //               },
    //             ]}
    //           >
    //             <Radio.Group
    //               name="radiogroup"
    //               onChange={(e) =>
    //                 handleOnChangeQuestionAnswer(
    //                   quiz_item.quiz_qn_id,
    //                   e.target.value
    //                 )
    //               }
    //               initialValues={null}
    //             >
    //               <Space direction="vertical">
    //                 {quiz_item.options.map((option_item) => {
    //                   return (
    //                     <Radio
    //                       key={quiz_item.quiz_qn_id + option_item.value}
    //                       value={option_item}
    //                     >
    //                       {option_item.option_description}
    //                     </Radio>
    //                   );
    //                 })}
    //               </Space>
    //             </Radio.Group>
    //           </Form.Item>
    //           <Form.Item className="button-container">
    //             <Button
    //               type="primary"
    //               htmlType="submit"
    //               style={{ background: "orange", borderColor: "orange" }}
    //             >
    //               Finish Quiz
    //             </Button>
    //           </Form.Item>
    //         </Form>
    //       </div>
    //     );
    //   })}
    //   <br />
    // </div>
  );
};

export { GameplayDisplay };
