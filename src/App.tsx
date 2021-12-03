import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import WorldMap from "./components/WordlMap/WorldMap";
import useBreakpoints, { Breakpoint } from "./hooks/useBreakpoints";
import ErrorView from "./pages/404";
import CountryView from "./pages/CountryPage/CountryPage";
import Home from "./pages/HomePage";

const MainView = () => {
  const breakpoint = useBreakpoints();
  const [mapWasRendered, setMapWasRendered] = useState<boolean>(false);

  useEffect(() => {
    if (!mapWasRendered && (breakpoint === Breakpoint.DESKTOP || breakpoint === Breakpoint.WIDESCREEN)) {
      setMapWasRendered(true);
    }
  }, [breakpoint, mapWasRendered]);

  return (
    <main className="container d-flex flex-column" style={{ flexGrow: 1 }}>
      <div className="d-grid grid-template">
        {(mapWasRendered || breakpoint === Breakpoint.DESKTOP || breakpoint === Breakpoint.WIDESCREEN) && (
          <WorldMap className="d-none d-lg-grid grid-lg-ce-2 grid-xl-ce-3 grid-lg-rs-2" />
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/country/:code" element={<CountryView />} />
          <Route path="*" element={<Navigate replace to="/404" />} />
        </Routes>
      </div>
    </main>
  );
};

function App() {
  return (
    <div className="d-flex flex-column app">
      <header className="separator">
        <NavBar />
      </header>
      <Routes>
        <Route path="/404" element={<ErrorView />} />
        <Route path="*" element={<MainView />}></Route>
      </Routes>
    </div>
  );
}

export default App;
