import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Question from "./pages/Question";
import QuizDetail from "./pages/QuizDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quizzes" element={<Quiz />} />
        <Route path="/questions" element={<Question />} />
        {/* Route cho từng quiz */}
        <Route path="/quizzes/:quizId" element={<QuizDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
