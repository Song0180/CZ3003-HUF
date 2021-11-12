import * as React from 'react';
// import { Stats } from '../../components/DashboardStats';
import { LDTable } from '../../components/LDTable';
import { Button, message } from 'antd';
import './index.css';
import { Link } from 'react-router-dom';

import {fetchDashboard} from '../../services/api/game'

//function to include the components needed and display the information for dashboard
const DashboardPage = () => {

  


  return (
    <div>
      <div className='dashboard-container'>
        <div className='dashboard-header-container'>
          <h1 className='dashboard-heading'>My Dashboard</h1>
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
            {/* internal link to edit game page */}
            <Link to={'dashboard/editgame'}>Edit Game</Link>    
          </Button>
          
          <Button type="primary">
            {/* internal link to edit quiz page */}
            <Link to={'dashboard/editquiz'}>Edit Quiz</Link>    
          </Button>
        </div>
       

      </div>
    </div>

  );
};

export default DashboardPage;
