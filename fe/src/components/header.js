import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
const Navbar = styled.nav`
  background-color: #333;
  padding: 1rem;
  margin: 0;
  border: none;
`;

const NavList = styled.ul`
  list-style-type: none;
  display: flex;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin: 0 1rem;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;
  transition: color 0.3s ease;

  &:hover {
    color: #f0a500;
  }
`;

const Header = () => {
  return (
    <Navbar>
      <NavList>
        <NavItem>
          <NavLink to="/">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/quizzes">Quizzes</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/questions">Questions</NavLink>
        </NavItem>
      </NavList>
    </Navbar>
  );
};

export default Header;
