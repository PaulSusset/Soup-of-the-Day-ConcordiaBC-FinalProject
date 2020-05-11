import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { displayMap, logOut } from '../../actions';

const AdminHome = () => {
  const history = useHistory();
  const user = useSelector((state) => state.restoActions.currentUser);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(displayMap(false));

    return () => dispatch(displayMap(true));
  }, []);
  return (
    <OverWrap>
      <Wrapper>
        <H3>Welcome {user.name}</H3>
        <OptionWrap>
          <Option onClick={() => history.push('/createdish')}>Add dish</Option>
          <Option onClick={() => history.push('/')}>
            Go back to searching!
          </Option>
          <Option onClick={() => dispatch(logOut())}>Log out</Option>
        </OptionWrap>
      </Wrapper>
    </OverWrap>
  );
};
const OptionWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgb(238, 229, 186);
  height: 80vh;
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  background: rgb(238, 229, 186);
  height: 80vh;
  width: 60%;
`;

const Option = styled.div`
  padding: 10px 20px;
  font-size: 1.3rem;
  border: 1px rgb(204, 88, 3) solid;
  border-radius: 7px;
  margin: 10px;
  text-align: center;
  width: 70%;
  transition: 200ms ease-in-out;
  &:hover {
    background: rgb(204, 88, 3);
    color: rgb(238, 229, 186);
  }
`;

const H3 = styled.h3`
  margin-top: 25px;
  text-align: center;
`;

const OverWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 92vh;
  /* width: 70vw; */
`;

export default AdminHome;
