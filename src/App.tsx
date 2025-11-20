import React, { useState } from "react";
import { Container, Tabs, Tab, Box } from "@mui/material";
import Timer from "./components/Timer";
import Countdown from "./components/Countdown";

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<number>(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <Container
      maxWidth="md"
      sx={{ py: 4, backgroundColor: "white", minHeight: "100vh" }}
    >
      <Tabs value={currentTab} onChange={handleTabChange} centered>
        <Tab label="Секундомер" />
        <Tab label="Таймер" />
      </Tabs>

      <Box sx={{ mt: 3 }}>
        {currentTab === 0 && <Timer title="Секундомер" />}
        {currentTab === 1 && <Countdown />}
      </Box>
    </Container>
  );
};

export default App;
