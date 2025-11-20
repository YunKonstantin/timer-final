import styled from "styled-components";
import { Paper, Typography } from "@mui/material";

export const TimerContainer = styled(Paper)`
  padding: 32px;
  text-align: center;
  max-width: 400px;
  margin: 20px auto;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
`;

export const TimeDisplay = styled(Typography)`
  font-family: "Monospace", monospace;
  font-size: 3rem;
  font-weight: bold;
  margin: 24px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 24px;
`;

export const Title = styled(Typography)`
  font-weight: 600;
  margin-bottom: 16px;
`;
