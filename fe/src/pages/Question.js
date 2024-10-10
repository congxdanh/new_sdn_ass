import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Header from "../components/header";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icon cây bút và thùng rác

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f0f0f0;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 2rem;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

const CorrectAnswer = styled.span`
  font-weight: bold;
  color: #28a745;
`;

const QuestionText = styled.p`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 400px;
`;

const Input = styled.input`
  padding: 0.5rem;
  margin: 0.5rem 0;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const EditIcon = styled(FaEdit)`
  cursor: pointer;
  color: #007bff;
  margin-left: 1rem;

  &:hover {
    color: #0056b3;
  }
`;

const DeleteIcon = styled(FaTrash)`
  cursor: pointer;
  color: #dc3545;
  margin-left: 1rem;

  &:hover {
    color: #b02a37;
  }
`;

const Question = () => {
  const [questions, setQuestions] = useState([]);
  const [text, setText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0);
  const [editingQuestion, setEditingQuestion] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          "https://sdn-ass1.onrender.com/questions"
        );
        setQuestions(response.data.data.questions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (correctAnswerIndex >= options.length || correctAnswerIndex < 0) {
      alert(`Correct answer index must be between 0 and ${options.length - 1}`);
      return;
    }
    try {
      const newQuestion = { text, options, correctAnswerIndex };

      if (editingQuestion) {
        // Update question
        const response = await axios.patch(
          `https://sdn-ass1.onrender.com/questions/${editingQuestion._id}`,
          newQuestion
        );

        if (response.status === 200 || response.status === 204) {
          setEditingQuestion(null);
        } else {
          console.error("Update failed with status:", response.status);
        }
      } else {
        // Create new question
        await axios.post(
          "https://sdn-ass1.onrender.com/questions",
          newQuestion
        );
      }

      // Reset form và cập nhật danh sách câu hỏi
      setText("");
      setOptions(["", "", "", ""]);
      setCorrectAnswerIndex(0);
      const updatedResponse = await axios.get(
        "https://sdn-ass1.onrender.com/questions"
      );
      setQuestions(updatedResponse.data.data.questions);
    } catch (error) {
      console.error("Error creating or updating question:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
    }
  };

  const handleEdit = (question) => {
    setEditingQuestion(question);
    setText(question.text);
    setOptions(question.options);
    setCorrectAnswerIndex(question.correctAnswerIndex);
  };

  const handleDelete = async (questionId) => {
    try {
      await axios.delete(
        `https://sdn-ass1.onrender.com/questions/${questionId}`
      );
      setQuestions(questions.filter((question) => question._id !== questionId));
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <div>
      <Header />
      <Container>
        <Title>Questions Page</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Question Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          {options.map((option, index) => (
            <Input
              key={index}
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              required
            />
          ))}
          <Input
            type="number"
            placeholder={`Correct Answer Index (0-${options.length - 1})`}
            value={correctAnswerIndex}
            min="0"
            max={options.length - 1}
            onChange={(e) => setCorrectAnswerIndex(Number(e.target.value))}
            required
          />
          <Button type="submit">
            {editingQuestion ? "Update Question" : "Create New Question"}
          </Button>
        </Form>
        <QuestionList>
          {questions.map((question) => (
            <QuestionItem key={question._id}>
              <div>
                <QuestionText>{question.text}</QuestionText>
                <CorrectAnswer>
                  Correct Answer:{" "}
                  {question.options[question.correctAnswerIndex]}
                </CorrectAnswer>
              </div>
              <div>
                <EditIcon onClick={() => handleEdit(question)} />
                <DeleteIcon onClick={() => handleDelete(question._id)} />
              </div>
            </QuestionItem>
          ))}
        </QuestionList>
      </Container>
    </div>
  );
};

export default Question;
