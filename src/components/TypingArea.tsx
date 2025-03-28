import { useState } from "react";

const TypingArea = () => {
  const [text, setText] = useState("");
  const [keyCount, setKeyCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const predefinedText = "Schreibe das, was hier steht ab";
  const accuracy = (keyCount > 0 ? (correctCount / keyCount) * 100 : 0).toFixed(1);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    setKeyCount((prev) => prev + 1);
    const newText = text + event.key;
    if (predefinedText.startsWith(newText)) {
      setCorrectCount(newText.length);
      setText(text);
    }
  };

  const correctText = predefinedText.slice(0, correctCount);
  const remainingText = predefinedText.slice(correctCount);

  return (
    <div>
      <p>
        <span style={{ color: "green" }}>{correctText}</span>
        <span style={{ color: "black" }}>{remainingText}</span>
      </p>
      <textarea
        onKeyPress={handleKeyPress}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <h2>Getippte Zeichen: {keyCount}</h2>
      <h2>Korrekte Zeichen: {correctCount}</h2>
      <h2>Genauigkeit: {accuracy}%</h2>
    </div>
  );
};

export default TypingArea;