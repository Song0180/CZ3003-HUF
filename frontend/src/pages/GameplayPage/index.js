import * as React from "react";
import { GameplayDisplay } from "../../components/GameplayDisplay";
import "antd/dist/antd.css";
import { Statistic, Row } from "antd";
import TimedPopUp from "../../components/TimedPopUp";
import "./index.css";
import { useEffect, useState } from "react";
import { useGameStore } from "../../services/zustand/game";

/*
  function to set the timer for the quiz
*/
const { Countdown } = Statistic;
const minutes = 1000 * 60 * 10; // Example, this is for 10 mins
const deadline = Date.now() + minutes;

/*
  function to include the components needed and display the information for Quiz Gameplay
*/

const GameplayPage = () => {
  const { currentQuizQuetsions, fetchGameQuiz } = useGameStore();
  const [userAnswers, setUserAnswers] = useState({});
  const [timedPopUp, setTimedPopUp] = useState(false);

  // To Spawn pop up message when the timer has run out of time
  useEffect(() => {
    setTimeout(() => {
      setTimedPopUp(true);
    }, minutes);
  }, []);

  // Fetches data of quiz using gameId
  React.useEffect(() => {
    const gameId = 0;
    fetchGameQuiz(gameId);
  }, [fetchGameQuiz]);

  // Set options to be empty (when user loads the quiz page)
  React.useEffect(() => {
    const emptyAnswers = {};
    currentQuizQuetsions.forEach((question) => {
      emptyAnswers[question.questionId] = null;
    });
    setUserAnswers(emptyAnswers);
  }, [currentQuizQuetsions]);

  React.useEffect(() => {
    console.log(userAnswers);
  }, [userAnswers]);

  return (
    <div>
      <div className="header-container">
        <h2 style={{ color: "orange" }}> CLOCKWORKS | Quiz 1 </h2>
        <div className="timer-con">
          <Countdown title="Timer" value={deadline} />
          <TimedPopUp trigger={timedPopUp} setTrigger={setTimedPopUp} />
        </div>
      </div>

      <Row>
        <div className="question-con">
          <GameplayDisplay
            quizQuestions={currentQuizQuetsions}
            currentAnswers={userAnswers}
            onAnswerQuestion={(newAnswers) => setUserAnswers(newAnswers)}
          />
        </div>
      </Row>
      <div>
        <h3>Your answers:</h3>
        {Object.keys(userAnswers).map((questionId) => {
          return (
            <p key={questionId}>
              QuestionId: {questionId}, AnswerValue:{" "}
              {userAnswers[questionId] ?? "No answer"}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default GameplayPage;
