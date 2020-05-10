import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setHover } from '../../actions';

const MapPin = (props) => {
  const dispatch = useDispatch();
  const hoverValue = useSelector((state) => state.dishesManipulation.hover);
  const { text, resto } = props;
  console.log(resto);
  return (
    <Pin
      src={resto.imgUrl}
      // onMouseEnter={() => dispatch(setHover(resto._id))}
    />
  );
};

const Pin = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: red 5px solid;
  color: white;
  background: red;
`;

export default MapPin;
