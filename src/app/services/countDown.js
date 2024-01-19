import React, { useState, useEffect } from 'react';
import { formatDistance, parseISO, differenceInSeconds } from 'date-fns';
import moment from 'moment';

const CountdownTimer = ({ targetDate }) => {
  const date1 = new Date(targetDate); // Replace this with your target date
  const currentDate = new Date();
  const [timeRemaining1, setTimeRemaining1] = useState(
    differenceInSeconds(date1, currentDate)
  );
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [options, setOptions] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      var s = differenceInSeconds(date1, new Date());
        if(s >= 0) {
          setTimeRemaining1(s);

          setHours(Math.floor(timeRemaining1 / 3600));
          setMinutes(Math.floor(timeRemaining1 / 60) % 60);
          var s = timeRemaining1 % 60;
          setSeconds(Math.floor(s));
        }
        else{
          setOptions("Reload Pages");
        }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [date1, currentDate, timeRemaining1]);

  return (
    <div>
      {
        timeRemaining1 > 0 && (
            <div>{hours}H : {minutes}M : {seconds}S</div>
        )
      }
      {
        options && (
          <div>{options}</div>
        )
      }
    </div>
  );
};

export default CountdownTimer;