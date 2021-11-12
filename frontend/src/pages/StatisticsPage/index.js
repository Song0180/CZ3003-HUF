import * as React from 'react';
// import { Stats } from '../../components/DashboardStats';
import { useParams, useHistory } from 'react-router';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { LDTable } from '../../components/LDTable';
import { useGameStore } from '../../services/zustand/game';
import { useAuthStore } from '../../services/zustand/auth';
import './index.css';

//function to include the components needed and display the information for dashboard
const StatisticsPage = () => {
  
  const { game_id } = useParams();
  const history = useHistory();

  const { userInfo } = useAuthStore();
  const { fetchUserGames, userGames } = useGameStore();
 

  React.useEffect(() => {
    const fetchData = async () => {
    };
    fetchData();
  }, [fetchUserGames, userInfo.username]);

  console.log(userGames)

  const handleOnClickEditGame = (game_id) => {
    history.push(`/dashboard/editgame/${game_id}`);
  };

  const handleOnClickEditQuiz = (game_id) => {
    history.push(`/dashboard/editquiz/${game_id}`);
  };

  console.log(game_id)
  
  return (
    <div>
      <div className='dashboard-container'>
        <div className='dashboard-header-container'>
          <h1 className='dashboard-heading'>Statistics Page</h1>
        </div>
        
      </div>

      <div className='info-container'>
        {/* <div className='item'> */}
          {/* <Stats />                 stats component */}
        {/* </div> */}
        <div className='item'>
          <LDTable />               {/* leader board table component */}
        </div>

        <hr/>
       
        <div className='button'>

          <Button type="primary">
            {/* internal link to dashboard page */}
            <Link to={'/dashboard'}>Back</Link>    
          </Button>

          <Button type="primary" onClick={() => handleOnClickEditGame(game_id)}>
            {/* internal link to edit game page */}
            Edit Game
          </Button>

          <Button type="primary" onClick={() => handleOnClickEditQuiz(game_id)}>
            {/* internal link to edit quiz page */}
            Edit Quiz
          </Button>
        </div>
       

      </div>
    </div>

  );
};

export default StatisticsPage;

