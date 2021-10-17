import * as React from 'react';
import { Input, List, Skeleton, message } from 'antd';

import './index.css';
import { SearchOutlined } from '@ant-design/icons';
import { useGameStore } from '../../services/zustand/game';
import { GameCard } from '../../components';
import GameModal from './components/GameModal';
import { useHistory } from 'react-router';

const GamesPage = () => {
  const history = useHistory();
  const { isLoading, games, fetchGames } = useGameStore();
  const [searchStr, setSearchStr] = React.useState('');
  const [filteredGames, setFilteredGames] = React.useState([]);
  const [showGameModal, setShowGameModal] = React.useState(false);
  const [currentGameInfo, setCurrentGameInfo] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const errorMessage = await fetchGames();
      if (errorMessage) {
        message.error('Failed to fetch games. Contact Admin for support.');
        message.error(errorMessage);
      } else {
        message.success('Successfully fetched latest games list');
      }
    };
    fetchData();
  }, [fetchGames]);

  React.useEffect(() => {
    setFilteredGames(games);
  }, [games]);

  const handleOnSearch = React.useCallback(
    (searchValue) => {
      const lowercaseSearchValue = searchValue.toLowerCase();
      // filter games based on search string
      const updatedFilteredGames = games.filter((game) =>
        game.game_name.toLowerCase().includes(lowercaseSearchValue)
      );
      setFilteredGames(updatedFilteredGames);
    },
    [games]
  );

  const handleOnClickGameCard = React.useCallback(
    (gameItem) => {
      setCurrentGameInfo(gameItem);
      setShowGameModal(true);
    },
    [setShowGameModal]
  );
  const handleOnCancelGameCard = React.useCallback(
    () => setShowGameModal(false),
    [setShowGameModal]
  );

  const handleOnClickGameStart = (gameId) => {
    history.push({
      pathname: '/gamequiz',
      state: {
        gameId,
      },
    });
  };

  React.useEffect(() => {
    // display all games when search string is 0
    if (searchStr.length === 0) {
      handleOnSearch(searchStr);
    }
  }, [handleOnSearch, searchStr]);

  return (
    <div className='game-page-container'>
      <div className='game-page-header-container'>
        <h2 className='game-page-heading'>Game Time!</h2>
        <Input
          prefix={
            <SearchOutlined style={{ color: 'rgba(17, 17, 17, 0.48)' }} />
          }
          placeholder='Search'
          className='search'
          allowClear
          value={searchStr}
          onChange={(e) => setSearchStr(e.target.value)}
          onPressEnter={() => {
            handleOnSearch(searchStr);
          }}
        />
      </div>
      <div className='info-container'>
        <p className='text'>
          Hi <span className='text-highlight'>James</span>, Please select the
          game you want tot start playing!
        </p>
        <div className='games-container'>
          <GameModal
            visible={showGameModal}
            onCancel={handleOnCancelGameCard}
            gameInfo={currentGameInfo}
            onGameStart={() => handleOnClickGameStart(currentGameInfo.game_id)}
          />
          <List
            loading={isLoading}
            grid={{
              gutter: [30, 16],
              column: filteredGames.length > 3 ? 3 : filteredGames.length,
            }}
            dataSource={filteredGames}
            renderItem={(item, index) => (
              <List.Item key={JSON.stringify(item) + index}>
                <Skeleton loading={isLoading} active>
                  <GameCard
                    title={item.game_name}
                    creator={item.user_id}
                    tag={item.game_tag}
                    onClick={() => handleOnClickGameCard(item)}
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

export default GamesPage;
