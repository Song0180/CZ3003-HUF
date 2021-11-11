import React from 'react';
import { message, Avatar, Button } from 'antd';
import { FacebookProvider, Share } from 'react-facebook';
import cx from 'classnames';

import { useGameStore } from '../../services/zustand/game';

import './index.css';
import { LeaderBoard } from '../../components';
import { FacebookFilled } from '@ant-design/icons';
import { useParams, useHistory } from 'react-router-dom';

const LeaderBoardPage = ({ location }) => {
  const { isLoading, currentQuizLeaderBoardData, fetchQuizLeaderBoard } =
    useGameStore();
  const { game_id, game_name, quiz_id } = useParams();
  const history = useHistory();

  React.useEffect(() => {
    const fetchLeaderBoard = async () => {
      const result = await fetchQuizLeaderBoard(quiz_id);
      if (typeof result === 'string') {
        message.error(
          `Unable to fetch leaderboard data for quiz id ${quiz_id}. Contact Admin for support.`
        );
        message.error(result);
      }
    };
    fetchLeaderBoard();
  }, [fetchQuizLeaderBoard, quiz_id]);

  const handleOnClickBack = () => {
    history.push(`/game/${game_id}/${game_name}`);
  };

  return (
    <div className='game-page-container'>
      <div
        className={cx(
          'game-page-header-container',
          'leaderboard-header-container'
        )}
      >
        <h2 className='game-page-heading'>
          {game_name.toUpperCase()} | Leaderboard
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
          <Button
            type='primary'
            className='lb-back-btn'
            onClick={handleOnClickBack}
          >
            Back
          </Button>
          <FacebookProvider appId='566862107737771'>
            <Share
              href='http://127.0.0.1:3000/'
              quote={`Join this quiz on HUF and beat me! http://localhost:3000/game/${game_id}/${game_name}`}
            >
              {({ handleClick, loading }) => (
                <Button
                  type='primary'
                  className='lb-fb-invite-btn'
                  icon={<FacebookFilled />}
                  onClick={handleClick}
                >
                  Invite your friends for a challenge
                </Button>
              )}
            </Share>
          </FacebookProvider>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoardPage;
