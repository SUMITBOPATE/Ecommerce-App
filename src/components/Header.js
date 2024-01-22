import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Nav from "./Nav";

const Header = () => {
  return (
    <MainHeader>
      <NavLink to="/">
        <p>Shopkart.</p>
       {/* / <img src="https://rapidapi-prod-apis.s3.amazonaws.com/347be1d0-7e0d-420d-adf3-baf4ccccde9b.png" alt="my logo img" /> */}
      </NavLink>
      <Nav />
    </MainHeader>
  );
};

const MainHeader = styled.header`
  padding: 0 3.8rem;
  height: 10rem;
  background-color: ${({ theme }) => theme.colors.bg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  p {
    // border:solid 1px red;
    font-size: 4rem;
    color:blue;
  }
`;
export default Header;