import React from 'react';
import { message } from 'antd';

import { useGameStore } from '../../services/zustand/game';

const GameQuizPage = ({ location }) => {
  const { isLoading, fetchGameQuiz, currentGameQuizzes } = useGameStore();

  const gameId = React.useMemo(
    () => location.state.gameId,
    [location.state.gameId]
  );

  React.useEffect(() => {
    const fetchQuizData = async () => {
      const errorMessage = await fetchGameQuiz(gameId);
      if (errorMessage) {
        message.error(
          'Failed to fetch quizzes for this game. Contact Admin for support.'
        );
        message.error(errorMessage);
      }
    };
    fetchQuizData();
  }, [fetchGameQuiz, gameId]);

  return (
    <div>
      {isLoading && <p>LOADING</p>}
      <p>GameId: {gameId}</p>
      <p>Number of quizzes in this game: {currentGameQuizzes.length}</p>
    </div>
  );
};

export default GameQuizPage;
