import { useEffect, useState } from 'react';
import './App.css'

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);



  return (
    <>
      <h1>Basic Stopwatch</h1>
      <div className="timer">{time}s</div>
      <p>Start Time: {startTime}</p>
      <p>End Time: {endTime}</p>
      <button onClick={() => {
        if (!isRunning) {
          setStartTime(new Date().toLocaleTimeString());
          setEndTime('');
        } else {
          setEndTime(new Date().toLocaleTimeString());
        }
        setIsRunning(!isRunning);
      }}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <button onClick={() => {
        setTime(0);
        setStartTime('');
        setEndTime('');
        setIsRunning(false);
      }}>
        Reset
      </button>
    </>
  )
}

export default App
