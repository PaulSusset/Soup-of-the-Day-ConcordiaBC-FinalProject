import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import Dropdown from '../Dropdown';
import styled from 'styled-components';

const Header = () => {
  // const history = useHistory();

  return (
    <Wrapper>
      <Dropdown />
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  /* position: sticky; */
  height: 7vh;
  z-index: 5;
`;

export default Header;
