import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f4f4f4;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 2rem;
  text-align: center;
`;

const QuestionsTitle = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
`;

const QuestionList = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 100%;
  max-width: 800px;
`;

const QuestionItem = styled.li`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 1rem 0;
  padding: 1rem;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

const QuestionText = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
`;

const OptionList = styled.ul`
  list-style-type: none;
  padding-left: 1.5rem;
`;

const OptionItem = styled.li`
  margin: 0.5rem 0;
  font-size: 1rem;
  color: ${(props) => (props.isCorrect ? "#28a745" : "#555")};
  font-weight: ${(props) => (props.isCorrect ? "bold" : "normal")};
`;

const QuizDetail = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const quizResponse = await axios.get(
          `https://sdn-ass1.onrender.com/quizzes/${quizId}`
        );
        setQuiz(quizResponse.data.data.quiz);

        const questionResponse = await axios.get(
          `https://sdn-ass1.onrender.com/quizzes/${quizId}/populate`
        );
        setQuestions(questionResponse.data.data.quiz.questions);
      } catch (error) {
        console.error("Error fetching quiz details:", error);
      }
    };

    fetchQuizDetails();
  }, [quizId]);

  return (
    <Container>
      {quiz ? (
        <>
          <Title>{quiz.title}</Title>
          <Description>{quiz.description}</Description>
          <QuestionsTitle>Questions</QuestionsTitle>
          <QuestionList>
            {questions.length > 0 ? (
              questions.map((question) => (
                <QuestionItem key={question._id}>
                  <QuestionText>{question.text}</QuestionText>
                  <OptionList>
                    {question.options.map((option, index) => (
                      <OptionItem
                        key={index}
                        isCorrect={index === question.correctAnswerIndex}
                      >
                        {option}{" "}
                        {index === question.correctAnswerIndex &&
                          "(Correct Answer)"}
                      </OptionItem>
                    ))}
                  </OptionList>
                </QuestionItem>
              ))
            ) : (
              <p>No questions available for this quiz.</p>
            )}
          </QuestionList>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
};

export default QuizDetail;
