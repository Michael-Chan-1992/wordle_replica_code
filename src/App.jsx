import { useEffect, useState } from "react";
import AttemptsDisplay from "./Components/AttemptsDisplay";
import Keyboard from "./Components/Keyboard";
import { WORDS } from "./words";
import Statistics from "./Components/Statistics";

const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;

const WIN_PHRASE = {
  0: "Perfect",
  1: "Excellent",
  2: "Very good",
  3: "Nice",
  4: "Not bad",
  5: "Phew",
};

const ANSWER = WORDS[Math.floor(Math.random() * WORDS.length)];
console.log(ANSWER);

const initialArr = Array(MAX_ATTEMPTS).fill(Array(WORD_LENGTH).fill(null));
const initialStat = {
  currentStreak: 0,
  maxStreak: 0,
  played: 0,
  guess: [0, 0, 0, 0, 0, 0],
};

const localStorageStat = localStorage.getItem("stat");
const stat = localStorageStat ? JSON.parse(localStorageStat) : initialStat;
let winAttempt = null;

function App() {
  const [attempts, setAttempts] = useState(initialArr);
  const [checks, setChecks] = useState(initialArr);
  const [keyboardChecks, setKeyboardChecks] = useState({});
  const [currAttempt, setCurrAttempt] = useState(0);
  const [notification, setNotification] = useState("");
  const [shake, setShake] = useState(false);

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const nextNullIndex = attempts[currAttempt]?.indexOf(null);
  const currentIndex = (nextNullIndex === -1 ? WORD_LENGTH : nextNullIndex) - 1;

  function shakeRow() {
    const row = document.getElementById(`row${currAttempt}`);
    row.classList.add("shake");
    setShake(true);
  }

  function showNotification(message, fadeNotification = true) {
    setNotification(message);
    const noti = document.getElementById("notification");
    noti.classList.remove("fade-out");
    if (fadeNotification) {
      setTimeout(() => {
        noti.classList.add("fade-out");
      }, 1000);
    }
  }

  useEffect(() => {
    const row = document.getElementById(`row${currAttempt}`);
    if (!row || !shake) return;

    const removeShake = () => {
      row.classList.remove("shake");
      setShake(false);
    };

    row.addEventListener("animationend", removeShake);

    return () => row.removeEventListener("animationend", removeShake);
  }, [shake, currAttempt]);

  function saveStat(win) {
    stat.played++;
    if (win) {
      stat.guess[currAttempt]++;
      stat.currentStreak++;
      stat.maxStreak =
        stat.currentStreak > stat.maxStreak
          ? stat.currentStreak
          : stat.maxStreak;
    } else {
      stat.currentStreak = 0;
    }

    localStorage.setItem("stat", JSON.stringify(stat));
    setTimeout(() => {
      openModal();
    }, 2000);
  }

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
        showNotification("Not in word list");
        shakeRow();
        return;
      }

      const checkResult = [];
      const answerArr = ANSWER.split("");
      attempts[currAttempt].forEach((letter, i) => {
        letter = letter.toLowerCase();
        if (answerArr[i] === letter) {
          answerArr[i] = "#";
          checkResult.push("correct");
          setKeyboardChecks((c) => ({
            ...c,
            [letter]: "correct",
          }));
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
            if (keyboardChecks[letter] !== "correct") {
              setKeyboardChecks((c) => ({
                ...c,
                [letter]: "position",
              }));
            }
            return;
          }
        }
        checkResult.push("none");
        setKeyboardChecks((c) => ({
          ...c,
          [letter]: "none",
        }));
      });

      setChecks(
        checks.map((row, i) => (currAttempt === i ? checkResult : row))
      );

      if (currWords === ANSWER) {
        showNotification(WIN_PHRASE[currAttempt], false);
        winAttempt = currAttempt;
        saveStat(true);
        setCurrAttempt(-1);
        return;
      }

      if (currAttempt === MAX_ATTEMPTS - 1) {
        showNotification(ANSWER.toUpperCase(), false);
        saveStat(false);
        setCurrAttempt(-1);
        return;
      }

      setCurrAttempt((prev) => prev + 1);
    } else {
      showNotification("Not enough letters");
      shakeRow();
    }
  }

  return (
    <>
      <header>
        <h1>Wordle Replica</h1>
        <button className="open-button" onClick={openModal}>
          📊
        </button>
      </header>
      <div className="popup-container">
        <p className="popup fade-out" id="notification">
          {notification}
        </p>
        <AttemptsDisplay attempts={attempts} checks={checks} />
      </div>
      <Keyboard
        disabled={currAttempt === -1}
        onLetter={handleLetter}
        onBack={handleBack}
        onEnter={handleEnter}
        keyStyle={keyboardChecks}
      />
      {isModalOpen && (
        <Statistics
          onClose={closeModal}
          stat={stat}
          greenBarIndex={winAttempt}
        />
      )}
    </>
  );
}

export default App;
