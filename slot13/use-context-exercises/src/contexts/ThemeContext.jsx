import React, { createContext, useContext, useState } from "react";

// 1) Khởi tạo context với giá trị mặc định
export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

// 2) Provider bao bọc ứng dụng
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () =>
    setTheme((t) => (t === "light" ? "dark" : "light"));

  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      {/* Mẹo nhỏ: đổi nền toàn app theo theme */}
      <div
        style={{
          minHeight: "100vh",
          background: theme === "light" ? "#f8f9fa" : "#111",
          color: theme === "light" ? "#212529" : "#f8f9fa",
          transition: "all .25s ease",
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

// 3) Custom hook cho tiện dùng
export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
