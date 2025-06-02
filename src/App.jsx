import React, { useCallback, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numbersAllowed) str += "123456789";
    if (charAllowed) str += "!@#$%^&*()-_=+[]{};:,.<>?/~";

    for (let i = 0; i < length; i++) {
      let index = Math.floor(Math.random() * str.length);
      pass += str.charAt(index);
    }

    setPassword(pass);
  }, [length, numbersAllowed, charAllowed]);

  const inputRef = useRef();

  const handleCopy = () => {
    if (inputRef.current) {
      const text = inputRef.current.value;
      inputRef.current.select(); // 🔥 visually highlights the password

      navigator.clipboard.writeText(text);
    }
  };

  return (
    <div className="password-generator-container">
      <h1>Password Generator</h1>
      <input
        type="text"
        value={password}
        placeholder="password"
        readOnly
        ref={inputRef}
      />
      <input
        type="range"
        min="8"
        max="32"
        value={length}
        onChange={(e) => setLength(Number(e.target.value))}
      />
      <span>{length}</span>
      <label>
        <input
          type="checkbox"
          checked={numbersAllowed}
          onChange={() => setNumbersAllowed((prev) => !prev)}
        />
        Include Numbers
      </label>
      <label>
        <input
          type="checkbox"
          checked={charAllowed}
          onChange={() => setCharAllowed((prev) => !prev)}
        />
        Include Symbols
      </label>
      <button className="mx-2" onClick={passwordGenerator}>
        Generate Password
      </button>{" "}
      {password && <p>{password}</p>}
      <button className="mx-3" onClick={handleCopy}>
        copy
      </button>
    </div>
  );
}

export default App;
