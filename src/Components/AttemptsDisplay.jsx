export default function AttemptsDisplay({ attempts }) {
  return (
    <div className="attempts">
      {attempts.map((row, i) => (
        <div className="row" key={`row${i}`}>
          {row.map((letter, j) => (
            <Attempt letter={letter} key={`row${i}:${j}`} />
          ))}
        </div>
      ))}
    </div>
  );
}

function Attempt({ letter }) {
  return <div className="cell">{letter}</div>;
}
