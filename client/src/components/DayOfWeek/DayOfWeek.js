import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setWeekday } from '../../actions';
import styled from 'styled-components';

const DayOfWeek = () => {
  const filterDay = useSelector(
    (state) => state.dishesManipulation.filters.day
  );

  const [today, setToday] = useState('');
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (filterDay) {
      setToday(filterDay);
    } else {
      const dayArr = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
      const d = new Date();
      setToday(dayArr[d.getDay()]);
    }
  }, []);
  useEffect(() => {
    dispatch(setWeekday(today));
    setLoaded(true);
  }, [today]);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(setWeekday(e.target.value));
  };

  return (
    <>
      {loaded && (
        <StyledSelect onChange={(e) => handleChange(e)} defaultValue={today}>
          <Option value={'all'}>All</Option>
          <Option value={'mon'}>Monday</Option>
          <Option value={'tue'}>Tuesday</Option>
          <Option value={'wed'}>Wednesday</Option>
          <Option value={'thu'}>Thursday</Option>
          <Option value={'fri'}>Friday</Option>
          <Option value={'sat'}>Saturday</Option>
          <Option value={'sun'}>Sunday</Option>
        </StyledSelect>
      )}
    </>
  );
};

const StyledSelect = styled.select`
  background: rgb(238, 229, 186);
  color: rgb(204, 88, 3);
  font-size: 0.9rem;
`;
const Option = styled.option``;

export default DayOfWeek;
