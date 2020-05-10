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
    <Wrapper>
      <Option>Welcome {user.name}</Option>
      <Option onClick={() => history.push('/createdish')}>Add dish</Option>
      <Option onClick={() => history.push('/')}>Go back to searching!</Option>
      <Option onClick={() => dispatch(logOut())}>Log out</Option>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;
const Option = styled.div`
  padding: 10px;
`;

export default AdminHome;
