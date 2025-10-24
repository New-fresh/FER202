import "bootstrap/dist/css/bootstrap.min.css";
import CounterComponent from "./components/CounterComponent";
import LightSwitch from "./components/LightSwitch";
import { ThemeProvider } from "./contexts/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <div className="container py-4">
        <CounterComponent />
        <LightSwitch />
      </div>
    </ThemeProvider>
  );
}
