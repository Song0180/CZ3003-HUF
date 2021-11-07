import * as React from 'react';
import { Table, message } from 'antd';
import { useGameStore } from '../../services/zustand/game';
import { useAuthStore } from '../../services/zustand/auth';
import './index.css';
import { data } from '../../mockData.js';

//Funtion that updates the table accordinly when sorted based on asc or desc.
function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

//Function to display leader board table
const LDTable = () => {

  const { userInfo } = useAuthStore();
  const { fetchQuizScore, fetchGameQuiz } = useGameStore();
  

  React.useEffect(() => {
    const fetchData = async () => {
      const errorMessage = await fetchGameQuiz();
      if (errorMessage) {
        message.error('Failed to fetch games. Contact Admin for support.');
        message.error(errorMessage);
      } else {
        message.success('Successfully fetched latest games list');
      }
    };
    fetchData();
  }, [fetchQuizScore, userInfo]);

  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     const errorMessage = await fetchUserGames(userInfo.username);
  //     if (errorMessage) {
  //       message.error('Failed to fetch games. Contact Admin for support.');
  //       message.error(errorMessage);
  //     } else {
  //       message.success('Successfully fetched latest games list');
  //     }
  //   };
  //   fetchData();
  // }, [fetchUserGames, userInfo.username]);


  return <Table columns={columns} dataSource={data} onChange={onChange} />
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
        {
            title: 'Player',
            dataIndex: 'name',
            width: 150,
        },
        {
            title: 'Quiz 1',
            dataIndex: 'quiz1',
            width: 100,
            sorter: {
                compare: (a, b) => a.quiz1 - b.quiz1,
            },
        },
        {
            title: 'Quiz 2',
            dataIndex: 'quiz2',
            width: 100,
            sorter: {
                compare: (a, b) => a.quiz2 - b.quiz2,
            },
        },
        {
            title: 'Quiz 3',
            dataIndex: 'quiz3',
            width: 100,
            sorter: {
                compare: (a, b) => a.quiz3 - b.quiz3,
            },
        },   
        {
            title: 'Quiz 4',
            dataIndex: 'quiz4',
            width: 100,
            sorter: {
                compare: (a, b) => a.quiz4 - b.quiz4,
            },
        }, 
        {
            title: 'Quiz 5',
            dataIndex: 'quiz5',
            width: 100,
            sorter: {
                compare: (a, b) => a.quiz5 - b.quiz5,
            },
        },     
      ]
    },
    
  ];

export { LDTable };

