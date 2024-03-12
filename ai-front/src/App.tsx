import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/index";
import QuestionPage from "./pages/QuestionPage";
import QuestionSample from "./pages/QuestionSample";
import QuestionSample2 from "./pages/QuestionSample2";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<QuestionPage num={1} />} />
        <Route path="/q1" element={<QuestionPage num={1} />} />
        <Route path="/q2" element={<QuestionPage num={2} />} />
        <Route path="/q3" element={<QuestionPage num={3} />} />
        <Route path="/sample" element={<QuestionSample />} />
        <Route path="/sample2" element={<QuestionSample2 />} />
      </Routes>
    </div>
  );
}

export default App;
