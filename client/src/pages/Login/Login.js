import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { logIn, displayMap } from '../../actions';
import Spinner from '../../components/Spinner';
import SOTD2 from '../../assets/SOTD2.png';
import SOTD1 from '../../assets/SOTD1.png';

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
    <OverWrap>
      <Wrapper>
        <Logo src={SOTD1} />
        {!loading ? (
          <>
            <StyledForm onSubmit={(e) => handleLogin(e)}>
              <Title>Log in</Title>
              <InputBox>
                <StyledInput
                  type={'text'}
                  placeholder={'Email'}
                  name={'email'}
                  required
                />
                <StyledInput
                  type={'password'}
                  placeholder={'Password'}
                  name={'password'}
                  required
                />
              </InputBox>
              <Btn type={'submit'} value={'Log in'} />
            </StyledForm>
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
    </OverWrap>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: rgb(238, 229, 186);
  width: 80vw;
  height: 80vh;
`;

const OverWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 92vh;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 30%;
  margin-bottom: 20%;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 60%;
  justify-content: space-evenly;
`;
const Logo = styled.img`
  height: 30%;
  width: auto;
`;
const StyledInput = styled.input`
  min-width: 120px;
  width: 25vw;
  padding: 6px 12px;
  font-size: 0.8rem;
  border: none;
  border-radius: 4px;
  &:focus {
    outline: none;
  }
`;
const Btn = styled.input`
  color: rgb(238, 229, 186);
  background: rgb(204, 88, 3);
  width: 50%;
  padding: 10px;
  font-size: 0.9rem;
  border: none;
  border-radius: 4px;
`;
const Title = styled.h2`
  text-align: center;
`;
export default Login;
