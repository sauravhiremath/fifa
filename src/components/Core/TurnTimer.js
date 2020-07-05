import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { number, func } from 'prop-types';

const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <div className="timer">Too late...</div>;
  }

  return (
    <div className="timer">
      <div className="text">Remaining</div>
      <div className="value">{remainingTime}</div>
      <div className="text">seconds</div>
    </div>
  );
};

const TurnTimer = ({ isTurn }) => {
  return (
    <div className="timer-wrapper">
      <CountdownCircleTimer
        isPlaying={isTurn}
        duration={10}
        colors={[['#004777', 0.33], ['#F7B801', 0.33], ['#A30000']]}
        onComplete={() => [false, 1000]}
      >
        {renderTime}
      </CountdownCircleTimer>
    </div>
  );
};

renderTime.propTypes = {
  remainingTime: number.isRequired
};

TurnTimer.propTypes = {
  isTurn: number.isRequired,
  turnKey: number.isRequired
};

export default TurnTimer;
