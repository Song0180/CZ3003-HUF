import * as React from 'react';
import { Statistic } from 'antd';

import './index.css'

/* 
function for to display individual game statistics that retrun data types of integer format 

title: title to be displayed to describe what the data represents
value{}: integer value of the decribed data 
*/

const Stats = () => {
  return <div>
    
    <Statistic title="Number of Quizzes" value={5} />
    <Statistic title="Total Players" value={18} />
    <Statistic title="Avg. Time Completed (Mins)" value={10} />
    <Statistic title="Avg. Game Score" value={76} />
    <Statistic title="Challenges Sent" value={5} />
    <Statistic title="Challenges Accepted" value={3} />
 
  </div>;
};

export { Stats };
