import React, { useState, useEffect } from "react";
import axios from "axios";

const Question = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await axios.get("http://localhost:3001/questions");
      setQuestions(response.data.data.questions);
    };
    fetchQuestions();
  }, []);

  return (
    <div>
      <h1>Questions Page</h1>
      <ul>
        {questions.map((question) => (
          <li key={question._id}>
            {question.text} - Correct Answer:{" "}
            {question.options[question.correctAnswerIndex]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
