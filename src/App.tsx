import React from "react";
import { Route, Routes } from "react-router-dom";
import CountryView from "./components/CountryDescription/CountryDescription";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import NavBar from "./components/NavBar/NavBar";
import WorldMap from "./components/WordlMap/WorldMap";
import Home from "./pages/Home";

function App() {
  return (
    <div className="d-flex flex-column app">
      <header className="separator">
        <NavBar />
      </header>
      <main className="container d-flex flex-column" style={{ flexGrow: 1 }}>
        <div className="d-grid grid-template">
          <WorldMap className="d-none d-lg-grid grid-lg-ce-2 grid-xl-ce-3 grid-lg-rs-2" />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/country/:code" element={<CountryView />} />
            <Route path="*" element={<div>404</div>} />
          </Routes>
        </div>
      </main>
      <LoadingScreen />
    </div>
  );
}

export default App;
