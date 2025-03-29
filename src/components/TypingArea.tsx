import { useState, useMemo } from "react";
import wordsData from "../../public/words.json";

const TypingArea = () => {
  const [text, setText] = useState("");
  const [keyCount, setKeyCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  // Berechne predefinedText nur einmal
  const predefinedText = useMemo(() => {
    let words = [...wordsData.words]; // Kopiere das Array, um Seiteneffekte zu vermeiden
    for (let i = words.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [words[i], words[j]] = [words[j], words[i]];
    }
    return words.slice(0, 60).join(" "); // Wähle die ersten 80 Wörter und verbinde sie
  }, []); // Leeres Abhängigkeitsarray: Wird nur einmal berechnet

  const accuracy = (keyCount > 0 ? (correctCount / keyCount) * 100 : 0).toFixed(1);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    setKeyCount((prev) => prev + 1);
    const newText = text + event.key;
    if (predefinedText.startsWith(newText)) {
      setCorrectCount(newText.length);
      setText(text); // Aktualisiere den Text korrekt
    }
  };

  const correctText = predefinedText.slice(0, correctCount);
  const remainingText = predefinedText.slice(correctCount);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "16px", gap: "16px" }}>
      <p style={{ fontSize: "1.7rem", fontFamily: "monospace" }}>
        <span style={{ color: "green" }}>{correctText}</span>
        <span style={{ color: "lightgray" }}>{remainingText}</span>
      </p>
      <textarea
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          outline: "none",
        }}
        onKeyPress={handleKeyPress}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <h2 style={{ fontSize: "1.25rem", fontWeight: "600", color: "blueviolet" }}>Getippte Zeichen: {keyCount}</h2>
      <h2 style={{ fontSize: "1.25rem", fontWeight: "600", color: "blueviolet"  }}>Korrekte Zeichen: {correctCount}</h2>
      <h2 style={{ fontSize: "1.25rem", fontWeight: "600", color: "blueviolet"  }}>Genauigkeit: {accuracy}%</h2>
    </div>
  );
};

export default TypingArea;