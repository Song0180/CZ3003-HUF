import * as React from 'react';
import { GameplayDisplay } from '../../components/GameplayDisplay';
import { Row, message } from 'antd';
import Timer from "../../components/Timer";
import './index.css';
import { useEffect, useState } from 'react';
import { useGameStore } from '../../services/zustand/game';
import { useParams } from 'react-router';

/*
  function to include the components needed and display the information for Quiz Gameplay
*/

const GameplayPage = () => {
  const { game_id, quiz_id } = useParams();
  const { isLoading, fetchQuizQuestions, quizQuestions } = useGameStore();
  const [userAnswers, setUserAnswers] = useState({});

  // Error message if failed to fetch and show data
  React.useEffect(() => {
    const fetchDataQuestion = async () => {
      const errorMessage = await fetchQuizQuestions(quiz_id);
      if (errorMessage) {
        message.error("Failed to fetch quiz. Contact Admin for support.");
        message.error(errorMessage);
      }
    };
    fetchDataQuestion();
  }, [fetchQuizQuestions, quiz_id]);

  // Fetches data of quiz using gameId
  useEffect(() => {
    fetchQuizQuestions(game_id);
  }, [fetchQuizQuestions, game_id]);

  // Set options to be empty (when user loads the quiz page)
  useEffect(() => {
    const emptyAnswers = {};
    quizQuestions.forEach((question) => {
      emptyAnswers[question.quiz_qn_id] = null;
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
