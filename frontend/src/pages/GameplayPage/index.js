import * as React from "react";
import { GameplayDisplay } from "../../components/GameplayDisplay";
import { Row, message, Button } from "antd";
import "./index.css";
import { useEffect, useState } from "react";
import { useGameStore } from "../../services/zustand/game";
import { useParams } from "react-router";
import Timer from "../../components/Timer";
import { Link } from "react-router-dom";

/*
  function to include the components needed and display the information for Quiz Gameplay
*/

const GameplayPage = () => {
  const { game_id, quiz_id, game_name } = useParams();
  const {
    isLoading,
    fetchQuizQuestions,
    quizQuestions,
    fetchGameQuiz,
    fetchQuizDetails,
    quizDetails,
  } = useGameStore();
  const [userAnswers, setUserAnswers] = useState({});

  // Error message if failed to fetch and show data
  useEffect(() => {
    const fetchDataQuestion = async () => {
      const errorMessage = await fetchQuizQuestions(quiz_id);
      if (errorMessage) {
        message.error("Failed to fetch quiz. Contact Admin for support.");
        message.error(errorMessage);
      }
    };
    fetchDataQuestion();
  }, [fetchQuizQuestions, quiz_id]);

  useEffect(() => {
    fetchGameQuiz(game_id);
  }, [fetchGameQuiz, game_id]);

  useEffect(() => {
    fetchQuizDetails(game_id, quiz_id);
  }, [fetchQuizDetails, game_id, quiz_id]);

  // Set empty options to be users options
  useEffect(() => {
    const emptyAnswers = {};
    quizQuestions.forEach((question) => {
      emptyAnswers[question.quiz_qn_id] = null;
    });
    setUserAnswers(emptyAnswers);
  }, [quizQuestions]);

  // get the game duration
  function findDuration() {
    const currentgameid = Number(game_id);
    const currentquizid = Number(quiz_id);
    for (let i = 0; i < quizDetails.length; i++) {
      if(quizDetails[i].game_id === currentgameid && quizDetails[i].quiz_id === currentquizid){
        return quizDetails[i].quiz_duration;
      }
    }
  }

  return (
    <div>
      <Button type="primary">
        <Link to={`/game/${game_id}/${game_name}`}>Back</Link>
      </Button>

      <div className="header-container">
        <h2 style={{ color: "orange" }}>
          {game_name} | Quiz {quiz_id}
        </h2>
        <div className="timer-con">
          <Timer minutes = {findDuration()}/>
        </div>
      </div>

      <Row>
        <div className="question-con">
          <GameplayDisplay
            loading={isLoading}
            quizQuestions={quizQuestions}
            currentAnswers={userAnswers}
            onAnswerQuestion={(newAnswers) => setUserAnswers(newAnswers)}
          />
        </div>
      </Row>
    </div>
  );
};

export default GameplayPage;
