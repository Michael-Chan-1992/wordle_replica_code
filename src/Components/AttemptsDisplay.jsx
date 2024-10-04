export default function AttemptsDisplay({ attempts, checks, jumpRow }) {
  return (
    <div className="attempts">
      {attempts.map((row, i) => (
        <div className="row" key={`row${i}`} id={`row${i}`}>
          {row.map((letter, j) => (
            <Attempt
              letter={letter}
              key={`row${i}:${j}`}
              check={checks[i][j]}
              jump={i === jumpRow}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function Attempt({ letter, check, jump }) {
  const classList = ["cell"];
  if (check) {
    classList.push(check, "animate");
  } else if (letter) {
    classList.push("highlight");
  }
  if (jump) {
    classList.push("jump");
  }
  return <div className={classList.join(" ")}>{letter}</div>;
}
