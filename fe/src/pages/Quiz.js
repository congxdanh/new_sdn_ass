import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Quiz = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const response = await axios.get("http://localhost:3001/quizzes");
      setQuizzes(response.data.data.quizzes);
    };
    fetchQuizzes();
  }, []);

  return (
    <div>
      <h1>Quiz Page</h1>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz._id}>
            <Link to={`/quizzes/${quiz._id}`}>{quiz.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Quiz;
