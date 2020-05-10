import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import StarRatingComponent from 'react-star-rating-component';
import { bowl } from 'react-icons-kit/entypo/bowl';
import Icon from 'react-icons-kit';
import { Link, useHistory } from 'react-router-dom';

const Item = (props) => {
  const history = useHistory();
  const userLocation = useSelector((state) => state.userLocation.userLocation);
  const restos = useSelector((state) => state.dishesManipulation.restos.total);
  const [distance, setDistance] = useState('');
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [ratingValue, setRatingValue] = useState(1);

  // console.log(props);
  const {
    name,
    price,
    category,
    days,
    restoName,
    rating,
    numOfRatings,
    _id,
    restoId,
    imgUrl,
  } = props.dish;
  const resto = props.resto;
  useEffect(() => {
    // console.log(userLocation, resto.location);
    if (resto) {
      fetch(
        `/getDistance?origin=${userLocation.lat},${userLocation.lng}&destination=${resto.location.lat},${resto.location.lng}`
      )
        .then((data) => data.json())
        .then((data) => {
          setDistance(data.rows[0].elements[0].distance.text);
        });
    }
  }, [userLocation, resto]);

  const handleSubmit = (nextValue, prevValue, name) => {
    fetch('/rateDish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ 'rating': nextValue, _id }),
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
      {' '}
      {resto && (
        <Wrapper
          onClick={() =>
            history.push(`/restaurant/${resto._id}/?dishId=${_id}`)
          }
        >
          <ImgPlaceholder src={`http://localhost:3000${imgUrl}`} />
          <Content>
            <ContentWrap>
              <Section>
                <div>
                  <Name>{name}</Name>
                  <div>{resto.name}</div>
                </div>
              </Section>
              <Section>
                {props.selected === _id ? (
                  ratingSubmitted ? (
                    <div>
                      <div>Thank you for your rating</div>
                      <StarRatingComponent
                        name={'rateDish'}
                        starCount={5}
                        value={ratingValue}
                        starColor={'rgb(255, 149, 5)'}
                        emptyStarColor={'rgb(38, 45, 55)'}
                        renderStarIcon={() => (
                          <Icon icon={bowl} style={{ padding: '1px' }} />
                        )}
                        onStarClick={(nextValue, prevValue, name, event) => {
                          event.preventDefault();
                          event.stopPropagation();
                        }}
                      />
                    </div>
                  ) : (
                    <div>
                      <div>Rate this dish?</div>
                      <StarRatingComponent
                        name={'rateDish'}
                        starCount={5}
                        value={Math.round((rating / numOfRatings) * 10) / 10}
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
                      {/* <form onSubmit={(e) => handleSubmit(e)}>
                      <input
                        type={'number'}
                        step={1}
                        min={1}
                        max={5}
                        defaultValue={5}
                        name={'rating'}
                      />
                      <span> /5</span>
                      <button type="submit">Submit</button>
                    </form> */}
                    </div>
                  )
                ) : numOfRatings > 0 ? (
                  <StarRatingComponent
                    name={'rateDish'}
                    starCount={5}
                    value={Math.round((rating / numOfRatings) * 10) / 10}
                    starColor={'rgb(255, 149, 5)'}
                    emptyStarColor={'rgb(38, 45, 55)'}
                    renderStarIcon={() => (
                      <Icon icon={bowl} style={{ padding: '1px' }} />
                    )}
                    onStarClick={(nextValue, prevValue, name, event) => {
                      event.preventDefault();
                      event.stopPropagation();
                    }}
                  />
                ) : (
                  <div>Not yet rated</div>
                )}
              </Section>
            </ContentWrap>
            <ContentWrap2>
              <div>{price}$</div>
              <Distance>{distance}</Distance>
            </ContentWrap2>
          </Content>
        </Wrapper>
      )}
    </>
  );
};
const Wrapper = styled.div`
  display: flex;
  margin: 5px;
  margin-bottom: 0;
  border: 1px solid lightgrey;
  color: rgb(38, 45, 55);
  /* color: black; */
  background: rgb(238, 229, 186);
  z-index: 3;
  justify-content: space-between;
  height: 90px;
  overflow: scroll;
  line-height: 1.1;
  border-radius: 4px;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Distance = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  text-align: right;
  width: fit-content;
  white-space: nowrap;
`;

const ImgPlaceholder = styled.img`
  width: 80px;
  height: 80px;
  margin: 4px;
`;
const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 2;
  padding: 5px;
  width: 100%;
`;
const ContentWrap2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  /* width: 100%; */
  padding: 5px;
  flex-grow: 1;
  min-width: fit-content;
`;
const Section = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Name = styled.h3`
  font-size: 1.2rem;
  margin: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  @media only screen and (max-width: 450px) {
    max-width: 200px;
  }
`;

export default Item;
