import * as React from 'react';
import { Table, message } from 'antd';
import './index.css';
// import { data } from '../../mockData.js';


// import {fetchDashboard} from '../../services/api/game'
import { useGameStore } from '../../services/zustand/game';
//Funtion that updates the table accordinly when sorted based on asc or desc.
function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

//Function to display leader board table
const LDTable = () => {

  const { currentDashboardData, fetchDashboard } = useGameStore();

  React.useEffect(() => {
    const fetchData = async () => {
      
      const currentDashboard = await fetchDashboard();
      // console.log('hi1');
      // console.log(currentDashboard);
      if (currentDashboard) {
        message.error('Failed to fetch dashboard. Contact Admin for support.');
        
      } else {
        message.success('Successfully fetched latest games list');
      }
    };
    fetchData();
    
  },[fetchDashboard, 2]); //need to change this with gameid
  

  return <Table columns={columns} dataSource={currentDashboardData} onChange={onChange} />
};

/* 
Formatting of what data titles to display

title: title to be displayed to describe what the column represents
dataIndex: name of column index
width: width of column
sorter: use to sort quiz score based on asc or desc 
*/
const columns = [
    {
        title: 'Leader Board',    //to display name of table
        children: [               //use children to include other titles under the table name
        // {
        //     title: 'duration_taken',
        //     dataIndex: 'name',
        //     width: 150,
        // },
        {
            title: 'quiz no',
            dataIndex: 'quiz_id',
            width: 100,
            sorter: {
                compare: (a, b) => a.quiz1 - b.quiz1,
            },
        },
        {
          title: 'user name',
          dataIndex: 'user_id_id__username',
          width: 100,
          sorter: {
              compare: (a, b) => a.quiz1 - b.quiz1,
          },
      },
        {
            title: 'score earned',
            dataIndex: 'score_earned',
            width: 100,
            sorter: {
                compare: (a, b) => a.quiz2 - b.quiz2,
            },
        },
          {
            title: 'duration taken',
            dataIndex: 'duration_taken',
            width: 100,
            sorter: {
                compare: (a, b) => a.quiz3 - b.quiz3,
            },
          },       
        ]
    },
    
  ];

export { LDTable };

