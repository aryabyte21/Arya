import { useState } from "react";
import {
  ColorSchemeProvider,
  ColorScheme,
  MantineProvider,
} from "@mantine/core";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HeaderResponsive } from "./components/Header";
import { RandomImage } from "./components/RandomImage";
import Arya from "./components/Arya";

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");

  const toggleColorScheme = () => {
    setColorScheme((prevScheme) => (prevScheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="App">
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{ colorScheme }}
          withGlobalStyles
          withNormalizeCSS
        >
          <Router>
            <HeaderResponsive
              links={[
                {
                  link: "/random",
                  label: "Random",
                },
                {
                  link: "/arya",
                  label: "Arya",
                },
              ]}
            />
            <Routes>
              <Route path="/" element={<RandomImage />} />
              <Route path="/random" element={<RandomImage />} />
              <Route path="/arya" element={<Arya />} />
            </Routes>
          </Router>
        </MantineProvider>
      </ColorSchemeProvider>
    </div>
  );
}

export default App;
