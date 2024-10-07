import axios from "axios";

// Cấu hình base URL cho axios
const api = axios.create({
  baseURL: "http://localhost:3001", // URL gốc cho các yêu cầu API
});

// Hàm lấy tất cả các quiz
export const fetchQuizzes = async () => {
  try {
    const response = await api.get("/quizzes");
    return response.data.data.quizzes;
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    throw error;
  }
};

// Hàm lấy chi tiết một quiz cụ thể
export const fetchQuizById = async (quizId) => {
  try {
    const response = await api.get(`/quizzes/${quizId}`);
    return response.data.data.quiz;
  } catch (error) {
    console.error("Error fetching quiz by ID:", error);
    throw error;
  }
};

// Hàm lấy câu hỏi của một quiz cụ thể
export const fetchQuestionsByQuizId = async (quizId) => {
  try {
    const response = await api.get(`/quizzes/${quizId}/populate`);
    return response.data.data.quiz.questions;
  } catch (error) {
    console.error("Error fetching questions for quiz:", error);
    throw error;
  }
};

// Hàm lấy tất cả các câu hỏi
export const fetchQuestions = async () => {
  try {
    const response = await api.get("/questions");
    return response.data.data.questions;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};
