import { Typography, Alert, Box, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  CountdownContainer,
  TimerCard,
  ButtonGroup,
  ControlButton,
} from "./Countdown.styles";
import TimeInput from "./InputTime";

interface TimeState {
  minutes: number;
  seconds: number;
  totalSeconds: number;
}

const Countdown: React.FC = () => {
  const [inputTime, setInputTime] = useState<TimeState>({
    minutes: 0,
    seconds: 0,
    totalSeconds: 0,
  });
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [initialTime, setInitialTime] = useState<number>(0);
  useEffect(() => {
    let intervalId: number | undefined;
    if (isRunning && remainingTime > 0) {
      intervalId = window.setInterval(() => {
        setRemainingTime((prevTime) => {
          const newTime = prevTime - 1;
          if (newTime <= 0) {
            setIsRunning(false);
            setIsFinished(true);
            playSound();
            setProgress(100);
            return 0;
          }
          const newProgress = ((initialTime - newTime) / initialTime) * 100;
          setProgress(newProgress);
          return newTime;
        });
      }, 1000);
    }
    return () => {
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [isRunning, initialTime, remainingTime]);

  const handleStartPause = () => {
    if (inputTime.totalSeconds === 0) {
      setError("Установите время хотя бы на 1 секунду");
      return;
    }

    if (error) setError("");

    if (isFinished) {
      setIsFinished(false);
      setInitialTime(inputTime.totalSeconds);
      setRemainingTime(inputTime.totalSeconds);
      setProgress(0);
      setIsRunning(true);
    } else if (remainingTime === inputTime.totalSeconds) {
      setIsRunning(true);
    } else {
      setIsRunning(!isRunning);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsFinished(false);
    setRemainingTime(inputTime.totalSeconds);
    setProgress(0);
  };

  const handleTimeChange = (newTime: TimeState) => {
    if (!isRunning && !isFinished) {
      setInputTime(newTime);
      setRemainingTime(newTime.totalSeconds);
      setInitialTime(newTime.totalSeconds);
      if (error && newTime.totalSeconds > 0) {
        setError("");
      }
    }
  };

  // const formatTime = (totalSeconds: number): string => {
  //   const minutes = Math.floor(totalSeconds / 60);
  //   const seconds = totalSeconds % 60;
  //   return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  // };

  const playSound = () => {
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 1
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 1);
  };

  return (
    <CountdownContainer maxWidth="sm">
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "primary.main",
          mb: 4,
          textAlign: "center",
        }}
      >
        ТАЙМЕР
      </Typography>
      <TimerCard elevation={6}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Установите время
          </Typography>
          <TimeInput
            onTimeChange={handleTimeChange}
            disabled={isRunning || isFinished}
            currentTime={remainingTime}
            isRunning={isRunning}
          />

          {error && (
            <Alert
              severity="error"
              sx={{
                mt: 2,
                backgroundColor: "rgba(211, 47, 47, 0.1)",
              }}
            >
              {error}
            </Alert>
          )}
        </Box>

        <Box sx={{ position: "relative", display: "inline-flex", mb: 3 }}>
          <CircularProgress
            variant="determinate"
            value={progress}
            size={200}
            thickness={4}
            sx={{
              color: "white",
            }}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h3"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              {Math.round(progress)}%
            </Typography>
          </Box>
        </Box>

        <ButtonGroup>
          <ControlButton
            variant="contained"
            onClick={handleStartPause}
            sx={{
              backgroundColor: isRunning ? "error.main" : "success.main",
              "&:hover": {
                backgroundColor: isRunning ? "error.dark" : "success.dark",
              },
            }}
          >
            {isFinished ? "Перезапуск" : isRunning ? "Пауза" : "Запуск"}
          </ControlButton>

          <ControlButton
            variant="outlined"
            onClick={handleReset}
            sx={{
              borderColor: "white",
              color: "white",
              "&:hover": {
                borderColor: "grey.300",
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            Сброс
          </ControlButton>
        </ButtonGroup>

        {isFinished && (
          <Alert
            severity="success"
            sx={{
              mt: 3,
              backgroundColor: "rgba(255,255,255,0.9)",
              color: "success.main",
            }}
          >
            Время вышло!
          </Alert>
        )}
      </TimerCard>
    </CountdownContainer>
  );
};

export default Countdown;
