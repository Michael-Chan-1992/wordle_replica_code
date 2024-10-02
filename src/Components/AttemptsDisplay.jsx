export default function AttemptsDisplay({ attempts, checks }) {
  return (
    <div className="attempts">
      {attempts.map((row, i) => (
        <div className="row shake" key={`row${i}`}>
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
  const classList = ["cell"];
  if (check) {
    classList.push(check, "animate");
  } else if (letter) {
    classList.push("highlight");
  }
  return <div className={classList.join(" ")}>{letter}</div>;
}
