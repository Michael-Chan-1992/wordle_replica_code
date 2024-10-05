import { Fragment } from "react";

export default function Statistics({ onClose, stat, greenBarIndex }) {
  const numOfWin = stat.guess.reduce((prev, curr) => prev + curr, 0);
  const maxNumOfWin = Math.max(...stat.guess);
  const winPercent =
    stat.played !== 0 ? Math.floor((numOfWin / stat.played) * 100) : 0;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <p>STATISTICS</p>
        <button className="close-button" onClick={onClose}>
          ❎
        </button>
        <div className="stat">
          <div>{stat.played}</div>
          <div>{winPercent}</div>
          <div>{stat.currentStreak}</div>
          <div>{stat.maxStreak}</div>
          <div className="heading">Played</div>
          <div className="heading">Win %</div>
          <div className="heading">Current Streak</div>
          <div className="heading">Max Streak</div>
        </div>
        <p>GUESS DISTRIBUTION</p>
        <div className="bar-chart">
          {stat.guess.map((numOfGuess, i) => (
            <Fragment key={i}>
              <div className="guess">{i + 1}</div>
              <div>
                <div
                  className={`${i === greenBarIndex ? "bar current" : "bar"}`}
                  style={{
                    maxWidth: `${
                      numOfGuess === 0 ? 0 : (numOfGuess / maxNumOfWin) * 100
                    }%`,
                  }}
                >
                  {numOfGuess}
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
