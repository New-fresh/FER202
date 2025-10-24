import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useTheme } from "../contexts/ThemeContext";

export default function CounterComponent() {
  const [count, setCount] = useState(0);
  const { theme, toggleTheme } = useTheme();

  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);
  const reset = () => setCount(0);

  const buttonStyle = {
    margin: "5px",
    padding: "10px 20px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
  };

  return (
    <div style={{ padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
      <h2>Bộ Đếm Đa Năng</h2>
      <p style={{ fontSize: 24, fontWeight: "bold" }}>
        Giá trị hiện tại: {count}
      </p>

      {/* Nút bật/tắt theme */}
      <Button
        onClick={toggleTheme}
        style={{
          ...buttonStyle,
          background: theme === "light" ? "#6c757d" : "#f8f9fa",
          color: theme === "light" ? "#ffffff" : "#000000",
        }}
        className="me-2"
      >
        {theme === "light" ? "Dark" : "Light"}
      </Button>

      <Button
        onClick={increment}
        style={{ ...buttonStyle, background: "#007bff", color: "white" }}
      >
        Tăng (+1)
      </Button>
      <Button
        onClick={decrement}
        style={{ ...buttonStyle, background: "#ffc107", color: "#333" }}
      >
        Giảm (-1)
      </Button>
      <Button
        onClick={reset}
        style={{ ...buttonStyle, background: "red", color: "white" }}
      >
        Reset
      </Button>
    </div>
  );
}
