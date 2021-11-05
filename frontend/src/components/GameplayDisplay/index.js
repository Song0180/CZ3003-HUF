import * as React from "react";
import { Radio, Space, Row, Button, Form } from "antd";
import "antd/dist/antd.css";
import "./index.css";

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

  // function to compute users total score
  function ComputeScore() {
    var totalScore = 0;
    for (let i = 0; i < quizQuestions.length; i++) {
      var correctAns = quizQuestions[i].correct_ans;
      var chosen = currentAnswers[i + 1].option_id;
      var score = quizQuestions[i].score_per_qn;
      if (correctAns === chosen) {
        totalScore = score + totalScore;
      }
    }
    console.log("totalscore: " + totalScore);
    return totalScore;
  }

  // computes score when quiz is finished
  const onFinish = (e) => {
    ComputeScore();
  };

  return (
    <div className="question-container">
      <Form name="answer-questions" onFinish={onFinish}>
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
  );
};

export { GameplayDisplay };
