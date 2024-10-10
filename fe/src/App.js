import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Question from "./pages/Question";
import QuizDetail from "./pages/QuizDetail";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { Navigate } from "react-router-dom";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Route path="/" element={<Home />} />
            <Route path="/quizzes" element={<Quiz />} />
            <Route path="/questions" element={<Question />} />
            <Route path="/quizzes/:quizId" element={<QuizDetail />} />
            {/* Trang hoặc component bạn muốn bảo vệ */}
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Home />} />
      <Route path="/quizzes" element={<Quiz />} />
      <Route path="/questions" element={<Question />} />
      {/* Route cho từng quiz */}
      <Route path="/quizzes/:quizId" element={<QuizDetail />} />
    </Routes>
  );
}

export default App;
