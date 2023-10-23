import React, { useState } from 'react';

function ColorConverter() {
  const [hexColor, setHexColor] = useState<string>('');
  const [rgbColor, setRgbColor] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [inputLength, setInputLength] = useState<number>(0);

  const handleHexChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setHexColor(value);
    setInputLength(value.length);

    if (value.length === 7) {
      if (isValidHexColor(value)) {
        setError('');
        updateRgbColor(value);
        document.body.style.backgroundColor = value; 
      } else {
        setError('Ошибка');
        document.body.style.backgroundColor = 'red'; 
      }
    } else {
      setError('');
      document.body.style.backgroundColor = 'initial';
    }
  };

  const isValidHexColor = (value: string) => /^#[0-9A-Fa-f]{6}$/.test(value);

  const updateRgbColor = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    setRgbColor(`RGB: ${r}, ${g}, ${b}`);
  };

  return (
    <div className="color-converter">
      <div className="color-display">
        <div className="color-hex">{hexColor}</div>
        <div className="color-rgb">{rgbColor}</div>
      </div>
      <input
        type="text"
        value={hexColor}
        onChange={handleHexChange}
        placeholder="#HEX (for example, #2D17F1)"
      />
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default ColorConverter;
