"use client";

import { useState } from "react";
import Button from "@mui/material/Button";

export default function CartCounter({ id, quantity }) {
  const [count, setCount] = useState(quantity);

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
  };

  const handleDecrement = () => {
    if (count > 0) {
      const newCount = count - 1;
      setCount(newCount);
    }
  };

  return (
    <div
      style={{
        boxShadow: '0 0 0.05rem 0.1rem rgba(0, 0, 0, 0.4)',
        borderRadius: '0.7rem',
        display: 'flex',
        alignItems: 'center',
        marginRight: '1rem',
      }}
    >
      <Button
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0)',
          border: 'none',
          color: 'black',
          fontSize: '1.2rem',
          padding: '0 0.5rem',
        }}
        onClick={handleDecrement}
      >
        -
      </Button>
      <span
        style={{
          color: 'black',
          fontSize: '1.5rem',
          marginLeft: '1.5rem',
          marginRight: '1.5rem',
        }}
      >
        {count}
      </span>
      <Button
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0)',
          border: 'none',
          color: 'black',
          fontSize: '1.2rem',
          padding: '0 0.5rem',
        }}
        onClick={handleIncrement}
      >
        +
      </Button>
    </div>

  );
}