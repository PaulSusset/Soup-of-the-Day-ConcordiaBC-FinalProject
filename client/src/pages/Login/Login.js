import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { logIn, displayMap } from '../../actions';
import Spinner from '../../components/Spinner';

const Login = () => {
  const dispatch = useDispatch();
  const [incorrectLogin, setIncorrectLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(displayMap(false));

    return () => dispatch(displayMap(true));
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setIncorrectLogin(false);
    const credentials = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    fetch(`/validateLogIn/${credentials.email}/${credentials.password}`)
      .then((data) => data.json())
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          setLoading(false);
          console.log('success');
          dispatch(logIn(res.currentAccount));
        } else {
          setIncorrectLogin(true);
          setLoading(false);
        }
      });
    return;
  };
  return (
    <Wrapper>
      {!loading ? (
        <>
          <form onSubmit={(e) => handleLogin(e)}>
            <input
              type={'text'}
              placeholder={'Email'}
              name={'email'}
              required
            />
            <input
              type={'password'}
              placeholder={'Password'}
              name={'password'}
              required
            />
            <input type={'submit'} value={'Log in'} />
          </form>
          {incorrectLogin && (
            <div>Incorrect email & password combination, try again!</div>
          )}
          <Link to={'/accountcreation'}>
            Interested in advertising your restaurant? Make an account here!
          </Link>
        </>
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: lightgreen;
`;
export default Login;
