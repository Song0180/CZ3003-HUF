import React from 'react';
import { message, Avatar, Button } from 'antd';
import { FacebookProvider, Share } from 'react-facebook';
import cx from 'classnames';

import { useGameStore } from '../../services/zustand/game';
import { useAuthStore } from "../../services/zustand/auth";

import './index.css';
import { LeaderBoard } from '../../components';
import { FacebookFilled } from '@ant-design/icons';
import { useParams, useHistory } from 'react-router-dom';

const LeaderBoardPage = ({ location }) => {
  const { isLoading, currentQuizLeaderBoardData, fetchQuizLeaderBoard, fetchQuizScore, score } =
    useGameStore();
  const { game_id, game_name, quiz_id } = useParams();
  const { userInfo } = useAuthStore();
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
    const fetchScore = async () => {
      const result = await fetchQuizScore(userInfo.userid, quiz_id);
      if (typeof result === 'string') {
        message.error(
          `Unable to fetch quiz score for quiz id ${quiz_id}. Contact Admin for support.`
        );
        message.error(result);
      }
    };
    fetchScore();
  }, [fetchQuizLeaderBoard, fetchQuizScore, quiz_id, userInfo.userid]);

  const handleOnClickBack = () => {
    history.push(`/game/${game_id}/${game_name}`);
  };

  // To show users' score for the quiz at the top right corner 
  function scoreData (){
    for(let i = 0; i < score.length; i++){
      if (
        score[i].quiz_id === Number(quiz_id) &&
        score[i].user_id === userInfo.userid
      ) {
        return score[i].score_earned;
      }
    }
  }

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
            {scoreData()}
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
