import React from "react";
import { Statistic } from "antd";
import "antd/dist/antd.css";
import TimedPopUp from "../TimedPopUp";
import { useEffect, useState } from 'react';

/*
    Function that will create pop up message when the timer for the quiz has run out.
    User will be able to close the pop up with the close button.
*/
function Timer(props) {
  const { Countdown } = Statistic;
  const minutes = 1000 * 60 * 10; // Example, this is for 10 mins
  const deadline = Date.now() + minutes;
  const [timedPopUp, setTimedPopUp] = useState(false);

  // To Spawn pop up message when the timer has run out of time
  useEffect(() => {
    setTimeout(() => {
      setTimedPopUp(true);
    }, minutes);
  }, []);
  return (
    <div>
      <Countdown title="Timer" value={deadline} />
      <TimedPopUp trigger={timedPopUp} setTrigger={setTimedPopUp} />
    </div>
  );
}

export default Timer;
