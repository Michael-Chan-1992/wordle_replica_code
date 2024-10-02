import { useEffect, useState } from "react";
import AttemptsDisplay from "./Components/AttemptsDisplay";
import Keyboard from "./Components/Keyboard";
import { WORDS } from "./words";

const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;

const ANSWER = WORDS[Math.floor(Math.random() * WORDS.length)];
console.log(ANSWER);

const initialArr = Array(MAX_ATTEMPTS).fill(Array(WORD_LENGTH).fill(null));

function App() {
  const [attempts, setAttempts] = useState(initialArr);
  const [checks, setChecks] = useState(initialArr);
  const [currAttempt, setCurrAttempt] = useState(0);

  const nextNullIndex = attempts[currAttempt]?.indexOf(null);
  const currentIndex = (nextNullIndex === -1 ? WORD_LENGTH : nextNullIndex) - 1;

  function shakeRow() {
    const row = document.getElementById(`row${currAttempt}`);
    row.classList.add("shake");
  }

  useEffect(() => {
    const row = document.getElementById(`row${currAttempt}`);
    function removeShake() {
      row.classList.remove("shake");
    }
    row.addEventListener("animationend", removeShake);
    return () => row.removeEventListener("animationend", removeShake);
  });

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
    if (currentIndex === WORD_LENGTH - 1) {
      const currWords = attempts[currAttempt].join("").toLowerCase();

      if (!WORDS.includes(currWords)) {
        console.log("Not in word list");
        shakeRow();
        return;
      }

      if (currWords === ANSWER) {
        console.log("Win");
      }

      const checkResult = [];
      const answerArr = ANSWER.split("");
      attempts[currAttempt].forEach((letter, i) => {
        letter = letter.toLowerCase();
        if (answerArr[i] === letter) {
          answerArr[i] = "#";
          checkResult.push("correct");
          return;
        }

        if (answerArr.includes(letter)) {
          const letterAnswerOcurrence = ANSWER.match(
            new RegExp(letter, "g")
          ).length;
          const letterAttemptOcurrence = currWords.match(
            new RegExp(letter, "g")
          ).length;

          if (
            letterAnswerOcurrence >= letterAttemptOcurrence ||
            i === currWords.lastIndexOf(letter)
          ) {
            checkResult.push("position");
            return;
          }
        }
        checkResult.push("none");
      });

      setChecks(
        checks.map((row, i) => (currAttempt === i ? checkResult : row))
      );

      setCurrAttempt((prev) => prev + 1);
    } else {
      console.log("Not enough letters");
      shakeRow();
    }
  }

  return (
    <>
      <h1>Wordle Replica</h1>
      <AttemptsDisplay attempts={attempts} checks={checks} />
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
