import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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

const QuizList = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 100%;
  max-width: 600px;
`;

const QuizItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  padding: 1rem;

  &:hover {
    transform: translateY(-4px);
  }

  a {
    color: #007bff;
    text-decoration: none;
    font-weight: bold;
  }

  a:hover {
    color: #0056b3;
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

const Quiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingQuiz, setEditingQuiz] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const response = await axios.get("https://sdn-ass1.onrender.com/quizzes");
      setQuizzes(response.data.data.quizzes);
    };
    fetchQuizzes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newQuiz = { title, description };
      await axios.post("https://sdn-ass1.onrender.com/quizzes", newQuiz);
      setTitle("");
      setDescription("");
      const response = await axios.get("https://sdn-ass1.onrender.com/quizzes");
      setQuizzes(response.data.data.quizzes);
    } catch (error) {
      console.error("Error creating new quiz:", error);
    }
  };

  const handleEdit = (quiz) => {
    setEditingQuiz(quiz);
    setTitle(quiz.title);
    setDescription(quiz.description);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedQuiz = { title, description };
      await axios.patch(
        `https://sdn-ass1.onrender.com/quizzes/${editingQuiz._id}`,
        updatedQuiz
      );
      setTitle("");
      setDescription("");
      setEditingQuiz(null);
      const response = await axios.get("https://sdn-ass1.onrender.com/quizzes");
      setQuizzes(response.data.data.quizzes);
    } catch (error) {
      console.error("Error updating quiz:", error);
    }
  };

  const handleDelete = async (quizId) => {
    try {
      await axios.delete(`https://sdn-ass1.onrender.com/quizzes/${quizId}`);
      setQuizzes(quizzes.filter((quiz) => quiz._id !== quizId));
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  return (
    <div>
      <Header />

      <Container>
        <Title>Quiz Page</Title>
        <Form onSubmit={editingQuiz ? handleUpdate : handleSubmit}>
          <Input
            type="text"
            placeholder="Quiz Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Button type="submit">
            {editingQuiz ? "Update Quiz" : "Create New Quiz"}
          </Button>
        </Form>
        <QuizList>
          {quizzes.map((quiz) => (
            <QuizItem key={quiz._id}>
              <Link to={`/quizzes/${quiz._id}`}>{quiz.title}</Link>
              <div>
                <EditIcon onClick={() => handleEdit(quiz)} />
                <DeleteIcon onClick={() => handleDelete(quiz._id)} />
              </div>
            </QuizItem>
          ))}
        </QuizList>
      </Container>
    </div>
  );
};

export default Quiz;
