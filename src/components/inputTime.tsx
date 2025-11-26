import React, { useState, useEffect } from "react";
import { Box, Slider, TextField } from "@mui/material";

interface TimeState {
  minutes: number;
  seconds: number;
  totalSeconds: number;
}

interface TimeInputProps {
  onTimeChange: (time: TimeState) => void;
  disabled: boolean;
  currentTime: number;
  isRunning: boolean;
}
const TimeInput: React.FC<TimeInputProps> = ({
  onTimeChange,
  disabled,
  currentTime,
  isRunning,
}) => {
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const sliderToTime = (sliderVal: number): TimeState => {
    const totalSecs = sliderVal * 15;
    return {
      minutes: Math.floor(totalSecs / 60),
      seconds: totalSecs % 60,
      totalSeconds: totalSecs,
    };
  };

  const timeToSlider = (mins: number, secs: number): number => {
    return Math.round((mins * 60 + secs) / 15);
  };

  useEffect(() => {
    if (!isInitialized) {
      const totalSecs = minutes * 60 + seconds;
      const newSliderValue = timeToSlider(minutes, seconds);
      setSliderValue(newSliderValue);
      onTimeChange({
        minutes: minutes,
        seconds: seconds,
        totalSeconds: totalSecs,
      });
      setIsInitialized(true);
    } else if (isRunning) {
      const currentSliderValue = timeToSlider(
        Math.floor(currentTime / 60),
        currentTime % 60
      );
      setSliderValue(currentSliderValue);
      setMinutes(Math.floor(currentTime / 60));
      setSeconds(currentTime % 60);
    }
  }, [currentTime, isRunning, isInitialized, minutes, seconds, onTimeChange]);

  const handleMinutesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const value = event.target.value;
    const newMinutes = Math.max(0, Math.min(720, Number(value) || 0));
    setMinutes(newMinutes);

    const totalSecs = newMinutes * 60 + seconds;
    const newSliderValue = timeToSlider(newMinutes, seconds);
    setSliderValue(newSliderValue);

    onTimeChange({
      minutes: newMinutes,
      seconds: seconds,
      totalSeconds: totalSecs,
    });
  };

  const handleSecondsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const value = event.target.value;
    const newSeconds = Math.max(0, Math.min(59, Number(value) || 0));
    setSeconds(newSeconds);

    const totalSecs = minutes * 60 + newSeconds;
    const newSliderValue = timeToSlider(minutes, newSeconds);
    setSliderValue(newSliderValue);

    onTimeChange({
      minutes: minutes,
      seconds: newSeconds,
      totalSeconds: totalSecs,
    });
  };

  const handleSliderChange = (_: Event, newValue: number | number[]) => {
    if (disabled) return;

    const value = Array.isArray(newValue) ? newValue[0] : newValue;
    setSliderValue(value);
    const newTime = sliderToTime(value);
    setMinutes(newTime.minutes);
    setSeconds(newTime.seconds);
    onTimeChange(newTime);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label="Минуты"
          type="number"
          value={minutes || ""}
          onChange={handleMinutesChange}
          disabled={disabled}
        />
        <TextField
          label="Секунды"
          type="number"
          value={seconds || ""}
          onChange={handleSecondsChange}
          disabled={disabled}
        />
      </Box>

      <Slider
        value={sliderValue}
        onChange={handleSliderChange}
        min={0}
        max={240}
        step={1}
        disabled={disabled}
        sx={{
          mb: 2,
          color: "white",
          "& .MuiSlider-track": {
            backgroundColor: "white",
          },
          "& .MuiSlider-rail": {
            backgroundColor: "rgba(255,255,255,0.3)",
          },
          "& .MuiSlider-thumb": {
            backgroundColor: "white",
          },
        }}
      />
    </Box>
  );
};
export default TimeInput;
