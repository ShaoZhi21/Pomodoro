import './App.css';
import React, {useState, useEffect} from 'react';

const App = () => {
  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(25)
  const [breakTime, setBreakTime] = useState(5)
  const [sessionTime, setSessionTime] = useState(25)
  const [isRunning, setIsRunning] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [message, setMessage] = useState("Set a timer")
  const [label, setLabel] = useState("Focus Session")
  
  const increment = (id) => {
    var audio = document.getElementById("increase-decrease")
    audio.currentTime = 0
    audio.play()
    const newBreakValue = breakTime + 1
    const newSessionValue = sessionTime + 1
    if (isRunning){
      if (id === "break"){
        if (newBreakValue > 60){
          setBreakTime(prevBreakTime => 60)
        } else if (newBreakValue < 1){
          setBreakTime(1)
        } else{
          setBreakTime(newBreakValue)
        }
      } else if (id === "session"){
          if (newSessionValue > 60){
            setSessionTime(prevSessionTime => 60)
          } else if (newSessionValue < 1){
            setSessionTime(1)
          } else{
            setSessionTime(newSessionValue);
          }
      }
    } else {
      if (id === "break"){
        if (newBreakValue > 60){
          setBreakTime(prevBreakTime => 60)
        } else if (newBreakValue < 1){
          setBreakTime(1)
        } else {
          setBreakTime(newBreakValue)
        }
      } else if (id === "session"){
          if (newSessionValue > 60){
            setSessionTime(prevSessionTime => 60)
            setMinutes(prevMinutes => 60)
          } else if (newSessionValue < 1){
            setSessionTime(1)
            setMinutes(1)
          } else {
            setSessionTime(newSessionValue);
            setMinutes(newSessionValue);
          }
      }
    }
  }
  
  const decrement = (id) => {
    var audio = document.getElementById("increase-decrease")
    audio.currentTime = 0
    audio.play()
    const newBreakValue = breakTime - 1
    const newSessionValue = sessionTime - 1
    if (isRunning){
      if (id === "break"){
        if (newBreakValue < 1){
          setBreakTime(prevBreakTime => 1)
        } else if (newBreakValue > 60){
          setBreakTime(prevBreakTime => 60)
        } else {
          setBreakTime(newBreakValue)
        }
      } else if (id === "session"){
          if (newSessionValue > 60){
            setSessionTime(prevSessionTime => 60)
          } else if (newSessionValue < 1){
            setSessionTime(prevSessionTime => 1)
          } else {
            setSessionTime(newSessionValue)
          }
      }
    } else {
      if (id === "break"){
        if (newBreakValue > 60){
          setBreakTime(prevBreakTime => 60)
        } else if (newBreakValue < 1){
          setBreakTime(prevBreakTime => 1)
        } else {
          setBreakTime(newBreakValue)
        }
      } else if (id === "session"){
          if (newSessionValue > 60){
            setSessionTime(prevSessionTime => 60)
            setMinutes(prevMinutes => 60)
          } else if (newSessionValue < 1){
            setSessionTime(prevSessionTime => 1)
            setMinutes(prevSessionTime => 1)
          } else {
            setSessionTime(newSessionValue)
            setMinutes(newSessionValue)
          }
      }
    }
  }
  
  useEffect(() => {
    let interval;
    if (isRunning) {
    interval = setInterval(() => {
      if (minutes === 0 && seconds === 0) {
        document.getElementById("beep").play()
        setTimeout(() => {
          if (!isBreak){
          setIsBreak(true)
          setMessage("Rest up!")
          setMinutes(breakTime)
          setSeconds(0)
          setLabel("Break Time")
        } else {
          setIsBreak(false)
          setMinutes(sessionTime)
          setSeconds(0)
          setLabel("Focus Session")
        }
        }, 1000) 
      } else if (seconds === 0) {
        setMinutes(prevMinutes => prevMinutes - 1)
        setSeconds(prevSeconds => 59)
      } else {
        setSeconds(prevSeconds => prevSeconds - 1)
      }
    }, 1000);
  } else {
    clearInterval(interval); // 
  }
    return () => clearInterval(interval)
  },[isRunning, minutes, seconds, isBreak, sessionTime, breakTime])
  
  const start = () => {
    var audio = document.getElementById("button-click-sound")
    audio.currentTime = 0
    audio.play()
    if (!isBreak){
      setMessage("Focus NOW!")
    } else {
      setMessage("Rest up!")
    }
    setIsRunning(true)
  }
  
  const stop = () => {
    var audio = document.getElementById("button-click-sound")
    audio.currentTime = 0
    audio.play()
    if (!isRunning){
      return
    } else {
      if (!isBreak){
      setMessage("STOP Slacking!")
    } else {
      setMessage("STOP extending your break")
      }
    }
    setIsRunning(false)
  }
  
  const reset = () => {
    var audio = document.getElementById("button-click-sound")
    audio.currentTime = 0
    audio.play()
    setMessage("Set a timer")
    setIsRunning(false);
    setIsBreak(false);
    setMinutes(25);
    setSeconds(0);
    setSessionTime(25);
    setBreakTime(5);
    setLabel("Focus Session")
  }
  
  const stopAndRewind = () => {
    const audio = document.getElementById("beep")
    if (audio){
      audio.pause()
      audio.currentTime = 0
    }
  }
  
  return(
    <div className={isBreak ? "break-pomodoro-color" : "not-break-pomodoro-color"} id="pomodoro">
      <div id="mainflex">
        <audio id="increase-decrease" src="
https://cdn.pixabay.com/audio/2022/02/17/audio_988aaf064c.mp3"></audio>
      <audio id="button-click-sound" src="https://cdn.pixabay.com/audio/2023/06/15/audio_a0e2c53290.mp3"></audio>
      <audio id="beep" src="https://soundbible.com/mp3/Store_Door_Chime-Mike_Koenig-570742973.mp3"></audio>
      <h1 className={isBreak ? "break-label-color" : "not-break-label-color"} id="timer-label">{label}</h1>
      <div className={isBreak ? "break-block-color" : "not-break-block-color"} id="block">
        <h1>{message}</h1>
        <h1 id="time-left">{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
        <div id="start_stop">
          <StartTimer isBreak={isBreak} start={start}/>
          <StopTimer isBreak={isBreak} stop={stop}/>
          <ResetTimer isBreak={isBreak} stopAudio={stopAndRewind} reset={reset}/>
        </div>
      </div>
      <div id="duration">
        <div id="session-label">
          <h1 className="text">Session Length</h1>
          <h1 id="session-length">{sessionTime} mins</h1>
          <div id="session-buttons">
            <SessionIncrement isBreak={isBreak} increment={() => increment("session")}/>
            <SessionDecrement isBreak={isBreak} decrement={() => decrement("session")}/>
          </div>
        </div>
        <div id="break-label">
          <h1 className="text">Break Length</h1>
          <h1 id="break-length">{breakTime} mins</h1>
          <div id="break-buttons">
            <BreakIncrement isBreak={isBreak} increment={() => increment("break")}/>
            <BreakDecrement isBreak={isBreak} decrement={() => decrement("break")}/>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}
      
const BreakIncrement = ({isBreak, increment}) => {
  return (
  <div>
      <button className={isBreak ? "break-button-color button-hover-color-break" : "not-break-button-color button-hover-color-not-break"} id="break-increment" onClick={increment}>+</button>
  </div>)
}

const BreakDecrement = ({isBreak, decrement}) => {
  return (
  <div>
      <button className={isBreak ? "break-button-color button-hover-color-break" : "not-break-button-color button-hover-color-not-break"} id="break-decrement" onClick={decrement}>-</button>
  </div>)
}

const SessionIncrement = ({isBreak, increment}) => {
  return (
  <div>
      <button className={isBreak ? "break-button-color button-hover-color-break" : "not-break-button-color button-hover-color-not-break"} id="session-increment" onClick={increment}>+</button>
  </div>)
}

const SessionDecrement = ({isBreak, decrement}) => {
  return (
  <div>
      <button className={isBreak ? "break-button-color button-hover-color-break" : "not-break-button-color button-hover-color-not-break"} id="session-decrement" onClick={decrement}>-</button>
  </div>)
}

const StartTimer = ({isBreak, start}) => {
  return (
  <button className={isBreak ? "break-button-color button-hover-color-break" : "not-break-button-color button-hover-color-not-break"} id="start" onClick={start}>Start</button>
  )
}

const StopTimer = ({isBreak, stop}) => {
  return (
  <button className={isBreak ? "break-button-color button-hover-color-break" : "not-break-button-color button-hover-color-not-break"} id="stop" onClick={stop}>Stop</button>
  )
}

const ResetTimer = ({isBreak, reset, stopAudio}) => {
  const handleReset = () => {
    reset()
    stopAudio()
  }
  return (
  <button className={isBreak ? "break-button-color button-hover-color-break" : "not-break-button-color button-hover-color-not-break"} id="reset" onClick={handleReset}>Reset</button>
  )
}

export default App;
