import { useState } from "react";
import AttemptsDisplay from "./Components/AttemptsDisplay";

const WORD_LENGTH = 5;
const MAX_TRIES = 6;
const initialArr = Array(MAX_TRIES).fill(Array(WORD_LENGTH).fill("A"));

function App() {
  const [attempts, setAttempts] = useState(initialArr);
  return (
    <>
      <h1>Wordle Replica</h1>
      <AttemptsDisplay attempts={attempts} />
    </>
  );
}

export default App;
