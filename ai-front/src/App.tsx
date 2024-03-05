import "./App.css";
import Q1 from "./pages/Q1";
import Q2 from "./pages/Q2";
import Q3 from "./pages/Q3";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/index";

function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Q1 num={1} />} />
        <Route path="/q1" element={<Q1 num={1} />} />
        <Route path="/q2" element={<Q2 num={2} />} />
        <Route path="/q3" element={<Q3 num={3} />} />
      </Routes>
    </div>
  );
}

export default App;
