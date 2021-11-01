import * as React from "react";
import "antd/dist/antd.css";


/*
  Calculate score when user click on button
*/

const ScoreCalculator = ({ currentAnswers = {}, quizQuestions = [] }) => {
  var ansValue = 0;
  var totalScore = 0;
  // console.log(currentAnswers);

  function AddValue() {
    ansValue = ansValue + 1;
  }

  function ComputeScore(correct, chosen, score) {
    console.log(correct); // can get correct answer
    console.log(chosen); // get back object with object_id and option, but only want the option user chose
    console.log(score); // can get score per qn
    if (correct === chosen){
      totalScore = score + totalScore;
    }
    return totalScore;
  }

  return (
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
    </div>
  );
};

export { ScoreCalculator };
