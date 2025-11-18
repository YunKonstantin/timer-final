import React, { useState, useEffect, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { Button, } from "@mui/material";
import { PlayArrow, Pause, Replay } from "@mui/icons-material";
import {
  TimerContainer,
  TimeDisplay,
  ButtonGroup,
  Title,
} from "./Timer.styles";

interface TimerProps {
  title?: string;
  initialTime?: number;
}

const Timer: React.FC<TimerProps> = ({ title = "Секундомер", initialTime = 0 }) => {
  const [time, setTime] = useState<number>(initialTime);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number>(0);

  const formatTime = useCallback((milliseconds: number): string => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const ms = Math.floor((milliseconds % 1000) / 10);

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${ms.toString().padStart(2, "0")}`;
  }, []);

  const displayTime = useMemo(() => formatTime(time), [time, formatTime]);

  const handleStartPause = useCallback(() => {
    if (!isRunning) {
      setStartTime(Date.now() - time);
      setIsRunning(true);
    } else {
      setIsRunning(false);
    }
  }, [isRunning, time]);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setTime(initialTime);
    setStartTime(0);
  }, [initialTime]);

  useEffect(() => {
    let intervalId: number | undefined;

    if (isRunning) {
      intervalId = window.setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
    }

    return () => {
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [isRunning, startTime]);

  const startPauseConfig = useMemo(
    () =>
      isRunning
        ? { text: "Пауза", icon: <Pause /> }
        : { text: "Запуск", icon: <PlayArrow /> },
    [isRunning]
  );

  return (
    <TimerContainer elevation={6}>
      <Title variant="h4" gutterBottom>
        {title}
      </Title>

      <TimeDisplay variant="h2">{displayTime}</TimeDisplay>

      <ButtonGroup>
        <Button
          variant="contained"
          color={isRunning ? "secondary" : "primary"}
          onClick={handleStartPause}
          startIcon={startPauseConfig.icon}
          size="large"
        >
          {startPauseConfig.text}
        </Button>

        <Button
          variant="outlined"
          color="inherit"
          onClick={handleReset}
          startIcon={<Replay />}
          size="large"
          disabled={time === initialTime && !isRunning}
        >
          Сбросить
        </Button>
      </ButtonGroup>
    </TimerContainer>
  );
};

Timer.propTypes = {
  title: PropTypes.string,
  initialTime: PropTypes.number,
};//по тз

export default React.memo(Timer);
