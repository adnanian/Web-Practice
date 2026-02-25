import { useEffect, useState } from 'react';
import './App.css';
import { Duration, type DurationParts } from './util/types';

function App() {
  const [timeLeft, setTimeLeft] = useState<Duration>(Duration.fromParts({ hours: 0, minutes: 0, seconds: 0 }));
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev.decrement());
    }, 1000);

    if (timeLeft.isTimeUp()) {
      setTimeout(() => {
        setIsRunning(false);
      }, 0);
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const timeParts: DurationParts = timeLeft.toParts();

  return (
    <>
      <div>
        <h1>Advanced Timer</h1>
        <div>
          <span>{String(timeParts.hours).padStart(2, '0')}</span>:
          <span>{String(timeParts.minutes).padStart(2, '0')}</span>:
          <span>{String(timeParts.seconds).padStart(2, '0')}</span>
        </div>
        {!isRunning && (
          <div>
            <label>Hours: </label>
            <input
              type="number"
              min="0"
              value={timeParts.hours}
              onChange={e => setTimeLeft(prev => prev.setHours(Number(e.target.value)))}
            />
            <label>Minutes: </label>
            <input
              type="number"
              min="0"
              max="59"
              value={timeParts.minutes}
              onChange={e => setTimeLeft(prev => prev.setMinutes(Number(e.target.value)))}
            />
            <label>Seconds: </label>
            <input
              type="number"
              min="0"
              max="59"
              value={timeParts.seconds}
              onChange={e => setTimeLeft(prev => prev.setSeconds(Number(e.target.value)))}
            />
          </div>
        )}
        <button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={() => {
          setIsRunning(false);
          setTimeLeft(Duration.fromParts({ hours: 0, minutes: 0, seconds: 0 }));
        }}>
          Reset
        </button>
      </div>
    </>
  )
}

export default App
