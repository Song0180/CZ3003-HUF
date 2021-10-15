import * as React from 'react';
import { Input, List, Skeleton } from 'antd';

import './index.css';
import { SearchOutlined } from '@ant-design/icons';
import { useGameStore } from '../../services/zustand/game';
import { GameCard } from '../../components';

const GamesPage = () => {
  const { isLoading, games, fetchGames } = useGameStore();
  const [searchStr, setSearchStr] = React.useState('');
  const [filteredGames, setFilteredGames] = React.useState([]);

  React.useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  React.useEffect(() => {
    setFilteredGames(games);
  }, [games]);

  const handleOnSearch = React.useCallback(
    (searchValue) => {
      const lowercaseSearchValue = searchValue.toLowerCase();
      // filter games based on search string
      const updatedFilteredGames = games.filter((game) =>
        game.title.toLowerCase().includes(lowercaseSearchValue)
      );
      setFilteredGames(updatedFilteredGames);
    },
    [games]
  );

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
          <List
            loading={isLoading}
            grid={{
              gutter: [30, 16],
              column: filteredGames.length > 3 ? 3 : filteredGames.length,
            }}
            dataSource={filteredGames}
            renderItem={(item, index) => (
              <List.Item key={index}>
                <Skeleton loading={isLoading} active>
                  <GameCard
                    title={item.title}
                    creator={item.creator}
                    tags={item.tags}
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
