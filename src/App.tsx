import { HeaderResponsive } from "./components/Header";
import "./App.css";
import { RandomImage } from "./components/RandomImage";

function App() {
  return (
    <div className="App">
      <HeaderResponsive
        links={[
          {
            link: "/random",
            label: "random",
          },
          {
            link: "/carousel",
            label: "carousel",
          },
          {
            link: "/github",
            label: "Learn",
          },
        ]}
      />
      <RandomImage />
    </div>
  );
}

export default App;
