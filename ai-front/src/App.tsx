import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Q1 from "./pages/Q1";
import Q2 from "./pages/Q2";
import Q3 from "./pages/Q3";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Q1 />} />
        <Route path="/q1" element={<Q1 />} />
        <Route path="/q2" element={<Q2 />} />
        <Route path="/q3" element={<Q3 />} />
      </Routes>
    </div>
  );
}

export default App;
