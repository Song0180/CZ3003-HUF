import React from 'react';
import { message, Avatar, Button } from 'antd';
import cx from 'classnames';

import { useGameStore } from '../../services/zustand/game';
// import { useAuthStore } from '../../services/zustand/auth';

import './index.css';
import { LeaderBoard } from '../../components';
import { FacebookFilled } from '@ant-design/icons';

const LeaderBoardPage = ({ location }) => {
  // const { userInfo } = useAuthStore();
  const { isLoading, currentQuizLeaderBoardData, fetchQuizLeaderBoard } =
    useGameStore();

  const gameInfo = React.useMemo(() => ({ game_name: 'haha' }), []);

  const handleOnClickInvite = () => {
    console.log('invite');
  };

  React.useEffect(() => {
    const fetchLeaderBoard = async () => {
      const result = await fetchQuizLeaderBoard();
      if (typeof result === 'string') {
        message.error(result);
      }
    };
    fetchLeaderBoard();
  }, [fetchQuizLeaderBoard]);

  return (
    <div className='game-page-container'>
      <div
        className={cx(
          'game-page-header-container',
          'leaderboard-header-container'
        )}
      >
        <h2 className='game-page-heading'>
          {gameInfo.game_name.toUpperCase()} | Leaderboard
        </h2>
        <div className='leaderboard-score-container'>
          <h2 className='score-title'>Your Score</h2>
          <Avatar size='large' id='score-circle'>
            {8}
          </Avatar>
        </div>
      </div>
      <div className='info-container'>
        <LeaderBoard data={currentQuizLeaderBoardData} isLoading={isLoading} />
        <div className='lb-bottom-container'>
          <Button type='primary' className='lb-back-btn'>
            Back
          </Button>
          <Button
            type='primary'
            className='lb-fb-invite-btn'
            icon={<FacebookFilled />}
            onClick={handleOnClickInvite}
          >
            Invite your friends for a challenge
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoardPage;