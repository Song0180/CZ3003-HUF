import * as React from 'react';
import { GameplayDisplay } from '../../components/GameplayDisplay';
import { Statistic, Row, message } from 'antd';
import Timer from "../../components/Timer";
import TimedPopUp from '../../components/TimedPopUp';
import './index.css';
import { useEffect, useState } from 'react';
import { useGameStore } from '../../services/zustand/game';
import { useParams } from 'react-router';

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
  const { game_id, quiz_id } = useParams();
  const { isLoading, currentQuizQuetsions, fetchQuizQuestions } = useGameStore();
  const [userAnswers, setUserAnswers] = useState({});
  const [timedPopUp, setTimedPopUp] = useState(false);
  console.log(game_id, quiz_id);

  // Error message if failed to fetch and show data
  React.useEffect(() => {
    const fetchDataQuestion = async () => {
      const errorMessage = await fetchQuizQuestions(quizId);
      if (errorMessage) {
        message.error("Failed to fetch quiz. Contact Admin for support.");
        message.error(errorMessage);
      }
    };
    fetchDataQuestion();
  }, [fetchQuizQuestions, quizId]);

  // Fetches data of quiz using gameId
  useEffect(() => {
    fetchQuizQuestions(game_id);
  }, [fetchQuizQuestions, game_id]);

  // Set options to be empty (when user loads the quiz page)
  useEffect(() => {
    const emptyAnswers = {};
    quizQuestions.forEach((question) => {
      emptyAnswers[question.questionId] = null;
    });
    setUserAnswers(emptyAnswers);
  }, [quizQuestions]);

  return (
    <div>
      <div className="header-container">
        <h2 style={{ color: "orange" }}> CLOCKWORKS | Quiz 1 </h2>
        <div className="timer-con">
          <Timer onLoad={Timer()} />
        </div>
      </div>

      <Row>
        <div className="question-con">
          <GameplayDisplay
            loading={isLoading}
            quizQuestions={quizQuestions}
            // quizOptions={quizOptions}
            currentAnswers={userAnswers}
            onAnswerQuestion={(newAnswers) => setUserAnswers(newAnswers)}
          />
        </div>
      </Row>
    </div>
  );
};

export default GameplayPage;
