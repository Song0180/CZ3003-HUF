import * as React from 'react';
import { GameplayDisplay } from '../../components/GameplayDisplay';
import 'antd/dist/antd.css';
import { Statistic, Row, message } from 'antd';
// import TimedPopUp from '../../components/TimedPopUp';
import Timer from '../../components/Timer';
import './index.css';
import { useEffect, useState } from 'react';
import { useGameStore } from '../../services/zustand/game';



/*
  function to include the components needed and display the information for Quiz Gameplay
*/

const GameplayPage = ({ location }) => {
  const { isLoading, quizQuestions, fetchQuizQuestions } = useGameStore();
  const [userAnswers, setUserAnswers] = useState({});
  // const [timedPopUp, setTimedPopUp] = useState(false);

  //   /*
  // function to set the timer for the quiz
  // */
  // const { Countdown } = Statistic;
  // const minutes = 1000 * 60 * 10; // Example, this is for 10 mins
  // const deadline = Date.now() + minutes;

  const quizId = React.useMemo(
    () => location.state.quizId,
    [location.state.quizId]
  );

  // // To Spawn pop up message when the timer has run out of time
  // useEffect(() => {
  //   setTimeout(() => {
  //     setTimedPopUp(true);
  //   }, minutes);
  // }, []);

  React.useEffect(() => {
    const fetchDataQuestion = async () => {
      const errorMessage = await fetchQuizQuestions(quizId);
      if (errorMessage) {
        message.error('Failed to fetch quiz. Contact Admin for support.');
        message.error(errorMessage);
      }
    };
    fetchDataQuestion();
  }, [fetchQuizQuestions, quizId]);

  // Fetches data of quiz using gameId
  useEffect(() => {
    const gameId = 1;
    fetchQuizQuestions(gameId);
  }, [fetchQuizQuestions]);

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
      <div className='header-container'>
        <h2 style={{ color: 'orange' }}> CLOCKWORKS | Quiz 1 </h2>
        <div className='timer-con'>
          <Timer onLoad = {Timer()} />
          {/* <Countdown title='Timer' value={deadline} /> */}
          {/* <TimedPopUp trigger={timedPopUp} setTrigger={setTimedPopUp} /> */}
        </div>
      </div>

      <Row>
        <div className='question-con'>
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
