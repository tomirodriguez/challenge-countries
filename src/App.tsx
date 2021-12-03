import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import NavBar from "./components/NavBar/NavBar";
import WorldMap from "./components/WordlMap/WorldMap";
import CountryView from "./pages/CountryPage/CountryPage";
import Home from "./pages/HomePage";

const MainView = () => {
  return (
    <>
      <main className="container d-flex flex-column" style={{ flexGrow: 1 }}>
        <div className="d-grid grid-template">
          <WorldMap className="d-none d-lg-grid grid-lg-ce-2 grid-xl-ce-3 grid-lg-rs-2" />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/country/:code" element={<CountryView />} />
            <Route path="*" element={<Navigate replace to="/404" />} />
          </Routes>
        </div>
      </main>
      <LoadingScreen />
    </>
  );
};

function App() {
  return (
    <div className="d-flex flex-column app">
      <header className="separator">
        <NavBar />
      </header>
      <Routes>
        <Route path="/404" element={<div>404</div>} />
        <Route path="*" element={<MainView />}></Route>
      </Routes>
    </div>
  );
}

export default App;
