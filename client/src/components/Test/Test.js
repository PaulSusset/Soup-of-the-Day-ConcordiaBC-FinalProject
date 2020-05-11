import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { displayMap } from '../../actions';
import styled from 'styled-components';
import SOTD1 from '../../assets/SOTD1.png';
import Spinner from '../Spinner';

const Test = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(displayMap(false));

    return () => dispatch(displayMap(true));
  }, []);
  return (
    <OverWrap>
      <InnerWrap>
        <Spinner size={70} />
      </InnerWrap>
    </OverWrap>
  );
};

const OverWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 92vh;
`;

const InnerWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  padding-bottom: 25vh;
  height: 80vh;
  background: rgb(238, 229, 186);
  width: 80vw;
  > p {
    padding: 10px;
  }
`;

export default Test;
