import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import {
  setCentering,
  setFilteredDishes,
  setWeekday,
  resetCentering,
} from '../../actions';

import Item from '../../components/Item';
import Map from '../../components/Map';
import Spinner from '../../components/Spinner';
import FilterBar from '../../components/FilterBar/FilterBar';

const Homepage = () => {
  const dispatch = useDispatch();
  const dishes = useSelector(
    (state) => state.dishesManipulation.dishes.filtered
  );
  const restos = useSelector((state) => state.dishesManipulation.restos.total);
  const allDishes = useSelector(
    (state) => state.dishesManipulation.dishes.total
  );
  const userLocation = useSelector((state) => state.userLocation.userLocation);
  const filters = useSelector((state) => state.dishesManipulation.filters);

  const loaded = useSelector((state) => state.dishesManipulation.loaded);
  const [dishesList, setDishesList] = useState(null);
  const [restosList, setRestosList] = useState(null);
  const [localLoad, setLocalLoad] = useState(false);

  useEffect(() => {
    const pr = filters.priceRange;
    const filteredDay = allDishes.filter((dish) => {
      if (filters.day !== 'all') {
        return dish.days[filters.day];
      } else {
        return true;
      }
    });
    const appliedRanges = Object.keys(pr).filter((key) => {
      return pr[key];
    });
    console.log(appliedRanges);

    const filteredPrice = filteredDay.filter((dish) => {
      if (appliedRanges.length) {
        if (
          appliedRanges.includes('under10') &&
          dish.price * 1 < 10 &&
          0 < dish.price * 1
        ) {
          return true;
        } else if (
          appliedRanges.includes('between') &&
          dish.price * 1 <= 15 &&
          10 <= dish.price * 1
        ) {
          return true;
        } else if (appliedRanges.includes('over15') && 15 < dish.price * 1) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    });

    const appliedPortions = Object.keys(filters.portion).filter(
      (key) => filters.portion[key]
    );
    const filteredPortion = filteredPrice.filter((dish) => {
      if (appliedPortions.length) {
        if (
          appliedPortions.includes('appetizer') &&
          dish.portion === 'appetizer'
        ) {
          return true;
        } else if (
          appliedPortions.includes('entree') &&
          dish.portion === 'entree'
        ) {
          return true;
        } else {
          return false;
        }
      } else return true;
    });

    const appliedLabels = Object.keys(filters.labels).filter(
      (key) => filters.labels[key]
    );

    const filteredLabels = filteredPortion.filter((dish) => {
      if (appliedLabels.length) {
        if (appliedLabels.includes('vegetarian') && dish.labels.vegetarian) {
          return true;
        } else if (appliedLabels.includes('vegan') && dish.labels.vegan) {
          return true;
        } else if (appliedLabels.includes('lowfat') && dish.labels.lowfat) {
          return true;
        } else if (appliedLabels.includes('meat') && dish.labels.meat) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    });

    dispatch(setFilteredDishes(filteredLabels));
  }, [filters, allDishes]);

  useEffect(() => {
    const dayArr = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const d = new Date();
    dispatch(setWeekday(dayArr[d.getDay()]));
  }, []);

  useEffect(() => {
    setDishesList(dishes);
    setRestosList(restos);
    setLocalLoad(true);
    console.log(dishes);
  }, [dishes, restos]);

  useEffect(() => {
    console.log('delay');
    dispatch(resetCentering());
  }, []);
  return (
    <>
      {loaded ? (
        <>
          <FilterBar />
          {localLoad ? (
            dishesList.length ? (
              dishesList.map((dish) => {
                const resto = restosList.find((resto) => {
                  return resto._id === dish.restoId;
                });

                return <Item key={dish._id} dish={dish} resto={resto} />;
              })
            ) : (
              <div>
                No results. <br />
                Change your filters or adjust the map to find restaurants
              </div>
            )
          ) : (
            <div>
              No results. <br />
              Change your filters or adjust the map to find restaurants
            </div>
          )}
        </>
      ) : (
        <Wrapper>
          <Spinner size={60} />
        </Wrapper>
      )}
    </>
  );
};
const Wrapper = styled.div`
  height: 52vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(238, 229, 186);
`;

export default Homepage;
