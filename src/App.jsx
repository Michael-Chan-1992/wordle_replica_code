import { useState } from "react";
import AttemptsDisplay from "./Components/AttemptsDisplay";
import Keyboard from "./Components/Keyboard";
import { WORDS } from "./words";

const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;

const ANSWER = WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase();
console.log(ANSWER);

const initialArr = Array(MAX_ATTEMPTS).fill(Array(WORD_LENGTH).fill(null));

function App() {
  const [attempts, setAttempts] = useState(initialArr);
  const [currAttempt, setCurrAttempt] = useState(0);

  const nextNullIndex = attempts[currAttempt]?.indexOf(null);
  const currentIndex = (nextNullIndex === -1 ? WORD_LENGTH : nextNullIndex) - 1;

  function handleLetter(letter) {
    if (nextNullIndex === -1) return;
    setAttempts(
      attempts.map((row, i) => {
        if (currAttempt === i) {
          return [
            ...row.slice(0, nextNullIndex),
            letter,
            ...row.slice(nextNullIndex + 1),
          ];
        }
        return row;
      })
    );
  }

  function handleBack() {
    if (currentIndex === -1) return;
    setAttempts(
      attempts.map((row, i) => {
        if (currAttempt === i) {
          return [
            ...row.slice(0, currentIndex),
            null,
            ...row.slice(currentIndex + 1),
          ];
        }
        return row;
      })
    );
  }

  function handleEnter() {
    setCurrAttempt((prev) => prev + 1);
  }

  return (
    <>
      <h1>Wordle Replica</h1>
      <AttemptsDisplay attempts={attempts} />
      <Keyboard
        disabled={currAttempt >= MAX_ATTEMPTS}
        onLetter={handleLetter}
        onBack={handleBack}
        onEnter={handleEnter}
      />
    </>
  );
}

export default App;
