import React, { useState, useEffect } from "react";
import VotePage from "./pages/VotePage";
import ResultPage from "./pages/ResultPage";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });
  const [todayResult, setTodayResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const checkResult = async () => {
      try {
        const response = await fetch("http://localhost:5002/api/result/today");
        const data = await response.json();
        if (data.success && data.result) {
          setTodayResult(data.result);
          return true; // Found result
        }
      } catch (err) {
        console.error("Failed to fetch today's result:", err);
      } finally {
        setLoading(false);
      }
      return false;
    };

    // Initial check
    checkResult();

    // Set up polling interval (every 30 seconds)
    const interval = setInterval(async () => {
      if (!todayResult) {
        const found = await checkResult();
        if (found) {
          clearInterval(interval);
        }
      } else {
        clearInterval(interval);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [todayResult]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  if (loading) {
    return <div className="loading">讀取中...</div>;
  }

  return (
    <div className="App">
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <header>
        <h1>午餐吃什麼</h1>
        <p className="subtitle">
          {todayResult
            ? "決策已定！今天吃這個："
            : "選擇你的美食，大家一起決定。"}
        </p>
      </header>
      <main>
        {todayResult ? <ResultPage result={todayResult} /> : <VotePage />}
      </main>
      <footer>
        <p>© 2026 午餐吃什麼</p>
      </footer>
    </div>
  );
}

export default App;
