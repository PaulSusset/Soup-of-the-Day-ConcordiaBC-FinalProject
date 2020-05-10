import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { createAccount, displayMap } from '../../actions';

const CreateAccount = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(displayMap(false));

    return () => dispatch(displayMap(true));
  }, []);
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
    <StyledForm onSubmit={(e) => newAccount(e)}>
      <input
        type={'text'}
        name={'name'}
        placeholder={'Restaurant Name'}
        required
      ></input>
      <input
        type={'text'}
        name={'address'}
        placeholder={'Street Address'}
        required
      ></input>
      <input
        type={'text'}
        name={'postalCode'}
        placeholder={'Postal code'}
        required
      ></input>
      <input type={'text'} name={'city'} value={'Montreal'} disabled></input>
      <input
        type={'tel'}
        name={'phone'}
        placeholder={'Phone number'}
        // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        required
      ></input>
      <input
        type={'text'}
        name={'cuisine'}
        placeholder={'Type of cuisine'}
      ></input>
      <input
        type={'email'}
        name={'email'}
        placeholder={'email'}
        required
      ></input>
      <input
        type={'password'}
        name={'password'}
        placeholder={'password'}
        required
      ></input>
      <label>Select Restaurant logo/Image</label>
      <input type={'file'} name={'image'} accept={'image'} required></input>
      <input type={'submit'} value={'Create Account'} />
    </StyledForm>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 30px;
`;
export default CreateAccount;
