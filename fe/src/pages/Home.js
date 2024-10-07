import React from "react";
import styled from "styled-components";
import Header from "../components/header";

// Styled components
const Container = styled.div`
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 1rem 0;
  color: #333;
  display: flex;
  justify-content: center;
`;

const Subtitle = styled.h3`
  font-size: 1.5rem;
  margin: 0.5rem 0;
  color: #555;
  display: flex;
  justify-content: center;
`;

const Home = () => {
  return (
    <Container>
      <Header />
      <Title>Home Page</Title>
      <Subtitle>Welcome to bank quiz</Subtitle>
    </Container>
  );
};

export default Home;
