import { styled } from '@mui/material/styles';
import { Container, Paper, Typography, Button, LinearProgress, Box } from '@mui/material';

export const CountdownContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));

export const TimerCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  textAlign: 'center',
}));

export const TimeDisplay = styled(Typography)(({ theme }) => ({
  fontFamily: 'Monospace',
  fontWeight: 'bold',
  fontSize: '4rem',
  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
  marginBottom: theme.spacing(3),
}));

export const ProgressBar = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  marginBottom: theme.spacing(4),
  backgroundColor: 'rgba(255,255,255,0.3)',
  '& .MuiLinearProgress-bar': {
    backgroundColor: 'white',
  },
}));

export const ButtonGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  justifyContent: 'center',
}));

export const ControlButton = styled(Button)(({ theme }) => ({
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
  fontSize: '1.1rem',
}));