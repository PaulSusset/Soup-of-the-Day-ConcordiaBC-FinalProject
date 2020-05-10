import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import StarRatingComponent from 'react-star-rating-component';
import { bowl } from 'react-icons-kit/entypo/bowl';
import Icon from 'react-icons-kit';
import { setCentering, setDirections } from '../../actions';
import Item from '../../components/Item';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Restaurant = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const dishId = useQuery().get('dishId');
  const [resto, setResto] = useState(null);
  const [dishList, setDishList] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [ratingValue, setRatingValue] = useState(1);
  const [todayDishes, setTodayDishes] = useState([]);
  const [otherDayDishes, setOtherDayDishes] = useState([]);

  const dayArr = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const d = new Date();
  const today = dayArr[d.getDay()];

  useEffect(() => {
    return () => {
      console.log('cancelling route');
      dispatch(setDirections());
    };
  }, []);

  useEffect(() => {
    fetch(`/getRestoInfo/${id}`)
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        setResto(data.resto);
        setDishList(data.dishList);
      });
  }, [id]);

  useEffect(() => {
    if (resto) dispatch(setDirections(resto.location));
  }, [resto]);

  useEffect(() => {
    if (dishList) {
      setSelectedDish(dishList.find((dish) => dish._id == dishId));
      setTodayDishes(dishList.filter((dish) => dish.days[today]));
      setOtherDayDishes(dishList.filter((dish) => !dish.days[today]));
    }
  }, [dishList]);
  useEffect(() => {
    if (resto && dishList && (!dishId || selectedDish)) {
      dispatch(setCentering(resto.location, 14));
      setLoaded(true);
    }
  }, [resto, dishList, selectedDish]);

  const handleSubmit = (nextValue, prevValue, name) => {
    fetch('/rateResto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ 'rating': nextValue, _id: id }),
    })
      .then((data) => data.json())
      .then((res) => {
        if (res.status == 200) console.log('rating added');
        else console.log(res);
      });
    setRatingSubmitted(true);
    setRatingValue(nextValue);
    console.log(ratingSubmitted);
  };

  return (
    <>
      <div
        style={{
          borderBottom: '3px solid rgb(255, 149, 5)',
          width: '100%',
        }}
      />
      {loaded && (
        <>
          <Wrapper>
            <ContentWrapper>
              <Banner src={resto.restoImg} />
              <Content>
                <h2>{resto.name}</h2>
                <Cuisine>{resto.cuisine}</Cuisine>
                <div>{resto.address}</div>
                <div style={{ marginBottom: '6px' }}>
                  {ratingSubmitted ? (
                    <>
                      <div>Thank you for your rating</div>
                      <StarRatingComponent
                        name={'rateDish'}
                        starCount={5}
                        value={ratingValue}
                        starColor={'rgb(255, 149, 5)'}
                        emptyStarColor={'rgb(38, 45, 55)'}
                        editing={true}
                        renderStarIcon={() => (
                          <Icon icon={bowl} style={{ padding: '1px' }} />
                        )}
                        onStarClick={(nextValue, prevValue, name, event) => {
                          event.preventDefault();
                          event.stopPropagation();
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <div>
                        How was your experience at <br />
                        {resto.name}?
                      </div>
                      <StarRatingComponent
                        name={'rateDish'}
                        starCount={5}
                        value={
                          Math.round((resto.rating / resto.numOfRatings) * 10) /
                          10
                        }
                        starColor={'rgb(255, 149, 5)'}
                        emptyStarColor={'rgb(38, 45, 55)'}
                        editing={true}
                        renderStarIcon={() => (
                          <Icon icon={bowl} style={{ padding: '1px' }} />
                        )}
                        onStarClick={(nextValue, prevValue, name, event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          handleSubmit(nextValue, prevValue, name);
                        }}
                      />
                    </>
                  )}
                </div>
              </Content>
            </ContentWrapper>
            {dishList.length ? (
              <>
                {todayDishes.length ? (
                  <>
                    {todayDishes.length > 1 ? (
                      <BasicTitle>Today's dishes</BasicTitle>
                    ) : (
                      <BasicTitle>Today's dish</BasicTitle>
                    )}
                    {todayDishes.map((dish) => {
                      console.log(dish);
                      return (
                        <div
                          key={dish.imgUrl}
                          style={{
                            borderTop: '1px solid rgb(255, 149, 5)',
                            borderBottom: '1px solid rgb(255, 149, 5)',
                          }}
                        >
                          <Item
                            dish={dish}
                            resto={resto}
                            selected={dishId}
                            key={dish._id}
                          />
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <BasicText>No soup today ☹️</BasicText>
                  </>
                )}
                {otherDayDishes.length ? (
                  <>
                    <BasicTitle>
                      Other days' dish{otherDayDishes.length > 1 && 'es'}
                    </BasicTitle>
                    {otherDayDishes.map((dish) => {
                      console.log(dish);
                      return (
                        <div
                          key={dish.imgUrl}
                          style={{
                            borderTop: '1px solid rgb(255, 149, 5)',
                            borderBottom: '1px solid rgb(255, 149, 5)',
                          }}
                        >
                          <Item
                            dish={dish}
                            resto={resto}
                            selected={dishId}
                            key={dish._id}
                          />
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <BasicText>No dishes on other days yet</BasicText>
                )}
              </>
            ) : (
              <>
                <BasicText>
                  This restaurant doesn't have any dishes for sale yet. Please
                  check back in at a later date.
                </BasicText>
              </>
            )}
          </Wrapper>
        </>
      )}
    </>
  );
};

const Banner = styled.img`
  width: 30%;
  height: auto;
`;

const Wrapper = styled.div`
  background: rgb(238, 229, 186);
  height: 52vh;
  overflow-y: scroll;
  margin: 0;
  display: flex;
  flex-direction: column;
  border-top: '4px solid rgb(255, 149, 5)';
  box-sizing: border-box;
`;

const BasicText = styled.p`
  padding: 3px;
`;
const BasicTitle = styled.h3`
  padding: 3px;
`;

const ContentWrapper = styled.div`
  display: flex;
  margin-bottom: 6px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px;
`;

const Cuisine = styled.div`
  background: rgb(171, 160, 130);
  color: rgb(238, 229, 186);
  font-size: 0.7rem;
  padding: 2px 4px;
  border-radius: 4px;
  width: fit-content;
`;

export default Restaurant;
