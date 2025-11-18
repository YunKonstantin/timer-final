import React, { useState, useEffect } from "react";
import { Box, Slider, TextField, Typography } from "@mui/material";

interface TimeState {
  minutes: number;
  seconds: number;
  totalSeconds: number;
}

interface TimeInputProps {
  onTimeChange: (time: TimeState) => void;
  disabled: boolean;
}

const TimeInput: React.FC<TimeInputProps> = ({ onTimeChange, disabled }) => {
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [sliderValue, setSliderValue] = useState<number>(0);

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

  const formatDisplayTime = (mins: number, secs: number): string => {
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const totalSecs = minutes * 60 + seconds;
    const newSliderValue = timeToSlider(minutes, seconds);
    setSliderValue(newSliderValue);
    onTimeChange({
      minutes: minutes,
      seconds: seconds,
      totalSeconds: totalSecs,
    });
  }, [minutes, seconds, onTimeChange]);

  const handleMinutesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const newMinutes = Math.max(0, Math.min(720, parseInt(value) || 0));
    setMinutes(newMinutes);
  };

  const handleSecondsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const newSeconds = Math.max(0, Math.min(59, parseInt(value) || 0));
    setSeconds(newSeconds);
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    const value = Array.isArray(newValue) ? newValue[0] : newValue;
    setSliderValue(value);
    const newTime = sliderToTime(value);
    setMinutes(newTime.minutes);
    setSeconds(newTime.seconds);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label="Минуты"
          type="number"
          value={minutes === 0 ? "" : minutes} 
          onChange={handleMinutesChange}
          disabled={disabled}
          inputProps={{ min: 0, max: 720 }}
          placeholder="0"
        />
        <TextField
          label="Секунды"
          type="number"
          value={seconds === 0 ? "" : seconds} 
          onChange={handleSecondsChange}
          disabled={disabled}
          inputProps={{ min: 0, max: 59 }}
          placeholder="0"
        />
      </Box>

      <Slider
        value={sliderValue}
        onChange={handleSliderChange}
        min={0}
        max={240}
        disabled={disabled}
        sx={{ mb: 2 }}
      />

      <Typography variant="h6">
        Выбрано: {formatDisplayTime(minutes, seconds)}
      </Typography>
    </Box>
  );
};

export default TimeInput;
