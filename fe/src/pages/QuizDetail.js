import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const QuizDetail = () => {
  const { quizId } = useParams(); // Lấy quizId từ URL
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        // Lấy thông tin quiz
        const quizResponse = await axios.get(
          `http://localhost:3001/quizzes/${quizId}`
        );
        setQuiz(quizResponse.data.data.quiz);

        // Lấy danh sách câu hỏi của quiz
        const questionResponse = await axios.get(
          `http://localhost:3001/quizzes/${quizId}/populate`
        );
        setQuestions(questionResponse.data.data.quiz.questions);
      } catch (error) {
        console.error("Error fetching quiz details:", error);
      }
    };

    fetchQuizDetails();
  }, [quizId]);

  return (
    <div>
      {quiz ? (
        <>
          <h1>{quiz.title}</h1>
          <p>{quiz.description}</p>
          <h2>Questions</h2>
          <ul>
            {questions.length > 0 ? (
              questions.map((question) => (
                <li key={question._id}>
                  {question.text}
                  <ul>
                    {question.options.map((option, index) => (
                      <li key={index}>
                        {option}{" "}
                        {index === question.correctAnswerIndex &&
                          "(Correct Answer)"}
                      </li>
                    ))}
                  </ul>
                </li>
              ))
            ) : (
              <p>No questions available for this quiz.</p>
            )}
          </ul>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default QuizDetail;
