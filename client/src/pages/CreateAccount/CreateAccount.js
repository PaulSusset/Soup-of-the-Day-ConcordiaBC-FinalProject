import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { createAccount, displayMap } from '../../actions';

const CreateAccount = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(displayMap(false));

    return () => dispatch(displayMap(true));
  }, []);

  const [imageName, setImageName] = useState('');
  const newAccount = async (e) => {
    e.preventDefault();
    const submissionForm = {
      name: e.target.name.value,
      address: `${e.target.address.value}, ${e.target.postalCode.value}, ${e.target.city.value}`,
      phone: e.target.phone.value,
      cuisine: e.target.cuisine.value,
      email: e.target.email.value,
      password: e.target.password.value,
      restoImg: e.target.image.files[0],
    };
    let formdata = new FormData();
    Object.keys(submissionForm).forEach((key) => {
      formdata.append(key, submissionForm[key]);
    });

    const initData = await fetch('/createNewAccount', {
      method: 'POST',
      headers: {
        // 'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
      },
      body: formdata,
    });
    const tempData = await initData.json();
    const currentUser = tempData.data;
    dispatch(createAccount(currentUser));
  };
  return (
    <OverWrap>
      <StyledForm onSubmit={(e) => newAccount(e)} autoComplete={'new-password'}>
        <Title>Create an account</Title>
        <StyledInput
          type={'text'}
          name={'name'}
          placeholder={'Restaurant Name'}
          required
          autoComplete={'new-password'}
        />
        <StyledInput
          type={'text'}
          name={'address'}
          placeholder={'Street Address'}
          required
          autoComplete={'new-password'}
        />
        <StyledInput
          type={'text'}
          name={'postalCode'}
          placeholder={'Postal code'}
          required
          autoComplete={'new-password'}
        />
        <StyledInput type={'text'} name={'city'} value={'Montreal'} disabled />
        <StyledInput
          type={'tel'}
          name={'phone'}
          placeholder={'Phone number'}
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          required
          autoComplete={'new-password'}
        />
        <StyledInput
          type={'text'}
          name={'cuisine'}
          placeholder={'Type of cuisine'}
          autoComplete={'new-password'}
        />
        <StyledInput
          type={'email'}
          name={'email'}
          placeholder={'Email'}
          required
          autoComplete={'new-password'}
        />
        <StyledInput
          type={'password'}
          name={'password'}
          placeholder={'Password'}
          required
        />
        <label>Select Restaurant logo/Image</label>
        <ImgUpload>
          <FakeBox>
            <FakeInput
              placeholder="Upload image"
              value={imageName.length ? imageName : ''}
            />
            <FakeButton>Browse</FakeButton>
          </FakeBox>
          <HiddenInput
            type={'file'}
            name={'image'}
            accept={'image'}
            required
            onChange={(e) => {
              console.log(e.target.files[0].name);
              setImageName(e.target.files[0].name);
            }}
          />
        </ImgUpload>
        <Btn type={'submit'} value={'Create Account'} />
      </StyledForm>
    </OverWrap>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 30px;
  height: 80vh;
  background: rgb(238, 229, 186);
  width: 80vw;
`;

const StyledInput = styled.input`
  min-width: 120px;
  width: 45vw;
  padding: 6px 12px;
  font-size: 0.8rem;
  border: none;
  border-radius: 3px;

  &:focus {
    outline: none;
  }
  &:disabled {
    background: rgb(248, 245, 202);
  }
`;

const OverWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 92vh;
`;
const Title = styled.h2`
  text-align: center;
`;

const Btn = styled.input`
  color: rgb(238, 229, 186);
  background: rgb(204, 88, 3);
  width: 50%;
  padding: 10px;
  font-size: 0.9rem;
  border: none;
  border-radius: 3px;
`;

const FakeInput = styled.input`
  width: 70%;
  text-align: center;
  padding: 4px 10px;
  border-radius: 5px 0 0 5px;
  border: none;
  text-overflow: ellipsis;
`;

const HiddenInput = styled.input`
  position: relative;
  text-align: right;
  opacity: 0;
  width: 100%;
  height: 100%;
  padding: 4px;
  z-index: 2;
  background: green;
`;

const ImgUpload = styled.div`
  min-width: 120px;
  width: 45vw;
  position: relative;
  margin-bottom: 10px;
`;

const FakeBox = styled.div`
  display: flex;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 1;
  width: 100%;
  /* padding: 4px 10px; */
  font-size: 0.8rem;
`;

const FakeButton = styled.div`
  width: 30%;
  padding: 4px 10px;
  background: rgb(80, 87, 95);
  border-radius: 0 5px 5px 0;
  color: rgb(238, 229, 186);
  text-align: center;
`;

export default CreateAccount;
