import { useEffect, useState } from 'react';
import './App.css';

function App() {
  // Time left in seconds.
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isRunning && timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  return (
    <>
      <div className="timer">
        <h1>{timeLeft} seconds</h1>
        <button onClick={() => setIsRunning(true)}>Start</button>
        <button onClick={() => setIsRunning(false)}>Stop</button>
        <button onClick={() => setTimeLeft(0)}>Reset</button>
        <input
          type="number"
          value={timeLeft}
          onChange={(e) => setTimeLeft(Number(e.target.value))}
          disabled={isRunning}
        />
      </div>
    </>
  )
}

export default App
