export default function AttemptsDisplay({ attempts, checks }) {
  return (
    <div className="attempts">
      {attempts.map((row, i) => (
        <div className="row" key={`row${i}`}>
          {row.map((letter, j) => (
            <Attempt
              letter={letter}
              key={`row${i}:${j}`}
              check={checks[i][j]}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function Attempt({ letter, check }) {
  return <div className={`cell ${check}`}>{letter}</div>;
}
