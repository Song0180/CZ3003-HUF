import React from 'react';
import { Statistic } from 'antd';
import { useEffect, useState, useRef } from 'react';
import TimedPopUp from '../TimedPopUp';
import 'antd/dist/antd.css';

/*
    Function that will create pop up message when the timer for the quiz has run out.
    User will be able to close the pop up with the close button.

    Timer will start countdown from the time set for the quiz by the creater.
    Once timer goes to 0, the pop up will appear.
*/
const Timer = ({ minutes, onTimeUp }) => {
  const { Countdown } = Statistic;
  const minute = 1000 * 60 * 0.1; // This is the quiz duration, eg minute = 1000 * 60 * 10 is for when quiz duration is 10 mins
  const deadline = useRef(Date.now() + minute);
  const [timedPopUp, setTimedPopUp] = useState(false);

  // To Spawn pop up message and compute user score when the timer has run out of time 
  useEffect(() => {
    setTimeout(() => {
      setTimedPopUp(true);
      onTimeUp();
    }, minute);
  },[]);

  return (
    <div>
      <Countdown title='Timer' value={deadline.current} />
      <TimedPopUp trigger={timedPopUp} setTrigger={setTimedPopUp} onTimeUp = {onTimeUp}/>
    </div>
  );
};

export default Timer;
