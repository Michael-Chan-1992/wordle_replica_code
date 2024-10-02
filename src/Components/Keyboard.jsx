const KEYBOARD_LAYOUT = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACK"],
];

export default function Keyboard() {
  return (
    <div className="keyboard">
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
