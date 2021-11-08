import * as React from "react";
import { GameplayDisplay } from "../../components/GameplayDisplay";
import { Row, message, Button } from "antd";
import { useEffect, useState } from "react";
import { useGameStore } from "../../services/zustand/game";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useAuthStore } from "../../services/zustand/auth";
import Timer from "../../components/Timer";
import "./index.css";

/*
  Page that includes components that allow user to play the quiz
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
  const { postUserScore } = useGameStore();
  const history = useHistory();
  const { userInfo } = useAuthStore();
  const currentquizid = Number(quiz_id);
  const currentgameid = Number(game_id);

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
    for (let i = 0; i < quizDetails.length; i++) {
      if (
        quizDetails[i].game_id === currentgameid &&
        quizDetails[i].quiz_id === currentquizid
      ) {
        return quizDetails[i].quiz_duration;
      }
    }
  }

  // function to compute users total score
  function computeScore() {
    var totalScore = 0;
    try {
      for (let i = 0; i < quizQuestions.length; i++) {
        if (!null) {
          var correctAns = quizQuestions[i].correct_ans;
          var score = quizQuestions[i].score_per_qn;
          if (correctAns === userAnswers[i + 1].option_id) {
            totalScore = score + totalScore;
          }
        } else {
          break;
        }
      }
    } catch {}
    console.log("totalscore: " + totalScore);
    return totalScore;
  }

  // When user finishes the quiz or time runs out, their score will be computed and they will be redirected to leaderboard page
  const onFinish = async (values) => {
    var userscore = computeScore();
    console.log('hello')
    const gameData = {
      quiz_id: currentquizid,
      user_id: userInfo.userid,
      score_earned: userscore,
      duration_taken: 2,
    };
    const result = await postUserScore(gameData);

    if (typeof result !== "string") {
      message.success(`Completed.`);
      history.push({
        pathname: `/leaderboard/${result.quiz_id}`,
        state: { gameData },
      });
    } else {
      message.error("You have already completed this quiz.");
    }
  };

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
          <Timer minutes={findDuration()} onTimeUp={onFinish} />
        </div>
      </div>

      <Row>
        <div className="question-con">
          <GameplayDisplay
            loading={isLoading}
            quizQuestions={quizQuestions}
            currentAnswers={userAnswers}
            onAnswerQuestion={(newAnswers) => setUserAnswers(newAnswers)}
            onFinishQuiz={onFinish}
          />
        </div>
      </Row>
    </div>
  );
};

export default GameplayPage;
