import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { setPriceRanges, setPortions, setLabels } from '../../actions';
import DayOfWeek from '../DayOfWeek';

const FilterBar = () => {
  const dispatch = useDispatch();
  const restos = useSelector((state) => state.dishesManipulation.restos.total);
  const stateRange = useSelector(
    (state) => state.dishesManipulation.filters.priceRange
  );
  const statePortions = useSelector(
    (state) => state.dishesManipulation.filters.portion
  );
  const stateLabels = useSelector(
    (state) => state.dishesManipulation.filters.labels
  );
  const [showing, setShowing] = useState(false);
  const [cuisineTypes, setCuisineTypes] = useState(null);
  const [priceRange, setPriceRange] = useState({
    under10: false,
    between: false,
    over15: false,
  });
  const [portion, setPortion] = useState({
    appetizer: false,
    entree: false,
  });
  const [label, setLabel] = useState({
    vegetarian: false,
    vegan: false,
    lowfat: false,
    meat: false,
  });

  const onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  useEffect(() => {
    setPriceRange(stateRange);
    setPortion(statePortions);
    setLabel(stateLabels);
  }, []);

  useEffect(() => {
    const cuisine = [];
    restos.forEach((resto) => {
      cuisine.push(resto.cuisine);
      setCuisineTypes(cuisine.filter(onlyUnique));
    });
  }, [restos]);

  // useEffect(() => {
  //   console.log(cuisineTypes);
  // }, [cuisineTypes]);

  useEffect(() => {
    console.log(priceRange);
    dispatch(setPriceRanges(priceRange));
  }, [priceRange]);

  useEffect(() => {
    console.log(portion);
    dispatch(setPortions(portion));
  }, [portion]);

  useEffect(() => {
    console.log(label);
    dispatch(setLabels(label));
  }, [label]);

  useEffect(() => {
    if (showing) window.scrollTo(0, 0);
  }, [showing]);

  return (
    <>
      <Bar>
        <DayOfWeek />
        <div
          onClick={() => setShowing(!showing)}
          style={{ flexGrow: 2, textAlign: 'right' }}
        >
          Filters {'  '}
          {showing ? <span>&#8657;</span> : <span>&#8659;</span>}
        </div>
      </Bar>
      {showing && (
        <Wrapper>
          {/* {cuisineTypes.map((cuisine) => {
            return (
              <div>
                <input type="checkbox" value={cuisine} />{' '}
                <label for={cuisine}>{cuisine}</label>
              </div>
            );
          })} */}
          <div>
            <div
              onClick={() =>
                setLabel({ ...label, vegetarian: !label.vegetarian })
              }
            >
              <input
                type={'checkbox'}
                value={'vegetarian'}
                checked={label.vegetarian}
              />
              <label htmlFor={'vegetarian'}>Vegetarian</label>
            </div>
            <div onClick={() => setLabel({ ...label, vegan: !label.vegan })}>
              <input type={'checkbox'} value={'vegan'} checked={label.vegan} />
              <label htmlFor={'vegan'}>Vegan</label>
            </div>
            <div onClick={() => setLabel({ ...label, lowfat: !label.lowfat })}>
              <input
                type={'checkbox'}
                value={'lowfat'}
                checked={label.lowfat}
              />
              <label htmlFor={'lowfat'}>Low-fat</label>
            </div>
            <div onClick={() => setLabel({ ...label, meat: !label.meat })}>
              <input type={'checkbox'} value={'meat'} checked={label.meat} />
              <label htmlFor={'meat'}>Meat</label>
            </div>
          </div>
          <div>
            <div
              onClick={() =>
                setPortion({ ...portion, appetizer: !portion.appetizer })
              }
            >
              <input
                type={'checkbox'}
                name={'portion'}
                value={'appetizer'}
                checked={portion.appetizer}
              />
              <label htmlFor={'appetizer'}>Appetizer</label>
            </div>
            <div
              onClick={() =>
                setPortion({ ...portion, entree: !portion.entree })
              }
            >
              <input
                type={'checkbox'}
                name={'portion'}
                value={'entree'}
                checked={portion.entree}
              />
              <label htmlFor={'entree'}>Entrée</label>
            </div>
          </div>
          <div>
            <div
              onClick={() =>
                setPriceRange({ ...priceRange, under10: !priceRange.under10 })
              }
            >
              <input
                type="checkbox"
                value={'Under 10$'}
                checked={priceRange.under10}
              />{' '}
              <label htmlFor={'Under 10$'}>{'Under 10$'}</label>
            </div>
            <div
              onClick={() =>
                setPriceRange({
                  ...priceRange,
                  between: !priceRange.between,
                })
              }
            >
              <input
                type="checkbox"
                value={'10$-15$'}
                checked={priceRange.between}
              />{' '}
              <label htmlFor={'10$-15$'}>{'10$-15$'}</label>
            </div>
            <div
              onClick={() =>
                setPriceRange({ ...priceRange, over15: !priceRange.over15 })
              }
            >
              <input
                type="checkbox"
                value={'15$+'}
                checked={priceRange.over15}
              />{' '}
              <label htmlFor={'15$+'}>{'15$+'}</label>
            </div>
          </div>
        </Wrapper>
      )}
    </>
  );
};

const Bar = styled.div`
  top: 0;
  position: sticky;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px;
  /* background: white; */
  color: rgb(238, 229, 186);
  height: 5vh;
  z-index: 4;
  background: rgb(204, 88, 3);
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  color: rgb(238, 229, 186);
  top: 0;
  box-sizing: border-box;
  background: rgb(204, 88, 3);
  padding: 0 12px;
`;
export default FilterBar;
