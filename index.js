import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

function PasswordGenerator() {
  const [password, setPassword] = useState("Password");
  const [length, setLength] = useState(10);
  const [numberChanged, setNumberChanged] = useState(false);
  const [specialChanged, setSpecialChanged] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState("Weak");

  function generatePassword() {
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberChanged) str += "0123456789";
    if (specialChanged) str += "!@#$%^&*()_+={}|:<>?/*";

    let pass = "";
    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length));
    }
    setPassword(pass);
    updateStrength(pass);
  }

  function updateStrength(pass) {
    const hasNumber = /\d/.test(pass);
    const hasSpecial = /[!@#$%^&*()_+={}|:<>?/*]/.test(pass);
    const isLong = pass.length >= 12;

    if (isLong && hasNumber && hasSpecial) {
      setStrength("Strong");
    } else if ((hasNumber && hasSpecial) || (isLong && (hasNumber || hasSpecial))) {
      setStrength("Medium");
    } else {
      setStrength("Weak");
    }
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(password).then(() => {
      alert("Password copied to clipboard!");
    });
  }

  useEffect(() => {
    generatePassword();
  }, [length, numberChanged, specialChanged]);

  return (
    <>
      <h1>{showPassword ? password : "*".repeat(password.length)}</h1>
      <div className="strength-indicator">
        <span>Strength: </span>
        <span className={`strength ${strength.toLowerCase()}`}>{strength}</span>
      </div>
      <div className="second">
        <div className="input-group">
          <label>Length ({length})</label>
          <input
            type="range"
            min={5}
            max={25}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </div>
        <div className="input-group">
          <input
            type="checkbox"
            checked={numberChanged}
            onChange={() => setNumberChanged(!numberChanged)}
          />
          <label>Include Numbers</label>
        </div>
        <div className="input-group">
          <input
            type="checkbox"
            checked={specialChanged}
            onChange={() => setSpecialChanged(!specialChanged)}
          />
          <label>Include Special Characters</label>
        </div>
        <div className="input-group">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label>Show Password</label>
        </div>
        <button onClick={generatePassword}>Regenerate</button>
        <button onClick={copyToClipboard}>Copy to Clipboard</button>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<PasswordGenerator />);