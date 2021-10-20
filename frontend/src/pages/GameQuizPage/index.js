import React from 'react';
import { message, List, Skeleton } from 'antd';

import { useGameStore } from '../../services/zustand/game';
import { useAuthStore } from '../../services/zustand/auth';
import QuizCard from './components/QuizCard';
import QuizModal from './components/QuizModal';
import { useHistory } from 'react-router';

const GameQuizPage = ({ location }) => {
  const history = useHistory();
  const { userInfo } = useAuthStore();
  const { isLoading, fetchGameQuiz, currentGameQuizzes } = useGameStore();
  const [showQuizModal, setShowQuizModal] = React.useState(false);
  const [currentQuizInfo, setCurrentQuizInfo] = React.useState(null);
  const [currentQuizIndex, setCurrentQuizIndex] = React.useState(null);

  const gameInfo = React.useMemo(
    () => location.state.gameInfo,
    [location.state.gameInfo]
  );

  const handleOnClickQuizCard = (quizInfo, index) => {
    setCurrentQuizInfo(quizInfo);
    setCurrentQuizIndex(index);
    setShowQuizModal(true);
  };

  const handleOnCancelQuizCard = () => {
    setShowQuizModal(false);
  };

  const handleOnQuizStart = () => {
    history.push({
      pathname: '/gameplay',
      state: {
        gameId: gameInfo.game_id,
        quizId: currentQuizInfo.quiz_id,
      },
    });
  };

  React.useEffect(() => {
    const fetchQuizData = async () => {
      const errorMessage = await fetchGameQuiz(gameInfo.game_id);
      if (errorMessage) {
        message.error(
          'Failed to fetch quizzes for this game. Contact Admin for support.'
        );
        message.error(errorMessage);
      }
    };
    fetchQuizData();
  }, [fetchGameQuiz, gameInfo.game_id]);

  return (
    <div className='game-page-container'>
      <div className='game-page-header-container'>
        <h2 className='game-page-heading'>
          {gameInfo.game_name.toUpperCase()}
        </h2>
      </div>
      <div className='info-container'>
        <p className='text'>
          Hi <span className='text-highlight'>{userInfo.username},</span>
        </p>
        <p className='text'>
          Welcome to the game{' '}
          <span className='text-highlight'>{gameInfo.game_name}!</span>
        </p>
        {currentGameQuizzes.length > 0 ? (
          <p className='text'>
            Please complete <span className='text-highlight'>{`quiz 1`}</span>{' '}
            to unlock other quizzes.
          </p>
        ) : (
          <p className='text'>This game does not have any quizzes.</p>
        )}
        <div className='games-container'>
          <QuizModal
            gameName={gameInfo.game_name}
            visible={showQuizModal}
            quizInfo={currentQuizInfo}
            quizIndex={currentQuizIndex}
            onCancel={handleOnCancelQuizCard}
            onQuizStart={handleOnQuizStart}
          />
          <List
            loading={isLoading}
            grid={{
              gutter: [30, 16],
              column:
                currentGameQuizzes.length > 3 ? 3 : currentGameQuizzes.length,
            }}
            dataSource={currentGameQuizzes}
            renderItem={(item, index) => (
              <List.Item key={JSON.stringify(item) + index}>
                <Skeleton loading={isLoading} active>
                  <QuizCard
                    quizInfo={item}
                    quizIndex={index}
                    onClick={() => handleOnClickQuizCard(item, index)}
                  />
                </Skeleton>
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default GameQuizPage;
