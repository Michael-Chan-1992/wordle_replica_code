const KEYBOARD_LAYOUT = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACK"],
];

export default function Keyboard({ onLetter, onBack, onEnter, disabled }) {
  function handleClick(e) {
    if (e.target.tagName !== "BUTTON" || disabled) return;
    switch (e.target.textContent) {
      case "ENTER":
        onEnter();
        break;
      case "BACK":
        onBack();
        break;
      default:
        onLetter(e.target.textContent);
    }
  }
  return (
    <div className="keyboard" onClick={handleClick}>
      {KEYBOARD_LAYOUT.map((row, i) => (
        <div className="keyboard-row" key={`keyboard-row${i}`}>
          {row.map((key) => (
            <Key key={key} keyValue={key} />
          ))}
        </div>
      ))}
    </div>
  );
}

function Key({ keyValue }) {
  return <button>{keyValue}</button>;
}
