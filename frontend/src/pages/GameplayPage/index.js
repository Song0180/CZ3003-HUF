import * as React from "react";
import { GameplayDisplay } from "../../components/GameplayDisplay";
import { Row, message, Button } from "antd";
import "./index.css";
import { useEffect, useState, useRef } from "react";
import { useGameStore } from "../../services/zustand/game";
import { useParams } from "react-router";
import Timer from "../../components/Timer"
import { Link } from 'react-router-dom';


/*
  function to include the components needed and display the information for Quiz Gameplay
*/

const GameplayPage = () => {
  const { game_id, quiz_id, game_name } = useParams();
  const { isLoading, fetchQuizQuestions, quizQuestions, fetchGameQuiz } = useGameStore();
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

  useEffect(() => {
    fetchGameQuiz(game_id);
  }, [fetchGameQuiz, game_id]);

  // Set empty options to be users options
  useEffect(() => {
    const emptyAnswers = {};
    quizQuestions.forEach((question) => {
      emptyAnswers[question.quiz_qn_id] = null;
    });
    setUserAnswers(emptyAnswers);
  }, [quizQuestions]);

  const timerRef = useRef();
  
  return (
    <div>
      <Button type="primary">
          <Link to={'/GameQuizPage'}>Back</Link>   
      </Button>
      
      <div className="header-container">
        {/* Want to get game_name from games and quiz_name from currentGameQuizzes */}
        <h2 style={{ color: "orange" }}> 
                {game_name} | Quiz {quiz_id}
        </h2> 
        
        <div className="timer-con">
          <Timer ref = {timerRef}/>
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
