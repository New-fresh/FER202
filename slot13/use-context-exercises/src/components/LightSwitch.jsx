import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useTheme } from "../contexts/ThemeContext";

export default function LightSwitch() {
  const [isLightOn, setIsLightOn] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const toggleLight = () => setIsLightOn((v) => !v); // functional update an toàn

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
    <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: 8, marginTop: 16 }}>
      <h2>Công Tắc Đèn</h2>
      <p style={{ fontSize: 24, fontWeight: "bold" }}>
        Đèn hiện đang: {isLightOn ? "Bật" : "Tắt"}
      </p>

      {/* Nút đổi theme toàn app */}
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

      {/* Nút bật/tắt đèn */}
      <Button
        onClick={toggleLight}
        style={{
          ...buttonStyle,
          background: isLightOn ? "red" : "green",
          color: "#fff",
        }}
      >
        {isLightOn ? "Tắt Đèn" : "Bật Đèn"}
      </Button>
    </div>
  );
}
