import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { number, func, string } from 'prop-types';

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

const TurnTimer = ({ isTurn, currentPlayer }) => {
  return (
    <div>
      <div className="timer-wrapper">
        <CountdownCircleTimer
          isPlaying={isTurn}
          duration={process.env.NODE_ENV === 'production' ? 300 : 10}
          colors={[['#2193b0', 0.5], ['#FFE000', 0.33], ['#A30000']]}
          size={160}
          strokeWidth={16}
          onComplete={() => [false, 1000]}
        >
          {renderTime}
        </CountdownCircleTimer>
      </div>
      <br />
      <h3>{`Current Chance: ${currentPlayer}`}</h3>
    </div>
  );
};

renderTime.propTypes = {
  remainingTime: number.isRequired
};

TurnTimer.propTypes = {
  isTurn: number.isRequired,
  currentPlayer: string.isRequired
};

export default TurnTimer;
