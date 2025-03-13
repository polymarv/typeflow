import { useState, useEffect } from "react";

const TypingArea = () => {
  const [text, setText] = useState("");
  const [keyCount, setKeyCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  

  const predefinedText = "Schreibe das, was hier steht ab";
  let accuracy = (correctCount / keyCount * 100).toFixed(1);
  

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    setKeyCount((prev) => prev + 1);
    const newText = text + event.key;
    if (predefinedText.startsWith(newText)) {
      setCorrectCount(newText.length);
    }
  };

  return (
    <div>
      <p>{predefinedText}</p>
      <textarea onKeyPress={handleKeyPress} value={text} onChange={(e) => setText(e.target.value)} />
      <h2>{keyCount}</h2>
      <h2>{correctCount}</h2>
      <h2>Accuracy: {accuracy}  </h2>
    </div>
  );
};

export default TypingArea;