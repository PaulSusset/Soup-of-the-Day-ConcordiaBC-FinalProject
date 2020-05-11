import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { displayMap } from '../../actions';
import styled from 'styled-components';
import Spinner from '../../components/Spinner';
import SOTD1 from '../../assets/SOTD1.png';

const CreateDish = () => {
  const user = useSelector((state) => state.restoActions.currentUser);
  const dispatch = useDispatch();
  const [imageName, setImageName] = useState('');
  const [loading, setLoading] = useState(false);
  const [creationSuccessful, setCreationSuccessful] = useState(false);
  useEffect(() => {
    dispatch(displayMap(false));

    return () => dispatch(displayMap(true));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const t = e.target;
    const body = {
      name: t.name.value,
      price: t.price.value,
      category: t.category.value,
      portion: t.portion.value,
      restoId: user._id,
      restoImg: t.image.files[0],
    };
    console.log(t.image.files[0]);
    const tags = [t.tag1.value, t.tag2.value, t.tag3.value];
    const labels = {
      'vegetarian': t.vegetarian.checked,
      'vegan': t.vegan.checked,
      'lowfat': t.lowfat.checked,
      'meat': t.meat.checked,
    };
    const days = {
      'mon': t.mon.checked,
      'tue': t.tue.checked,
      'wed': t.wed.checked,
      'thu': t.thu.checked,
      'fri': t.fri.checked,
      'sat': t.sat.checked,
      'sun': t.sun.checked,
    };
    let formdata = new FormData();
    Object.keys(body).forEach((key) => {
      formdata.append(key, body[key]);
    });
    formdata.append('labels', JSON.stringify(labels));
    formdata.append('days', JSON.stringify(days));
    formdata.append('tags', JSON.stringify(tags));

    const initData = await fetch('/createNewDish', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: formdata,
    });
    const response = await initData.json();
    if (response.status == 200) setCreationSuccessful(true);
    if (response.status == 500) setCreationSuccessful(false);
    setLoading(false);
    console.log(response);
  };

  return (
    <OverWrap>
      {loading ? (
        <Spinner size={70} />
      ) : !creationSuccessful ? (
        <StyledForm onSubmit={(e) => handleSubmit(e)}>
          <h2>Creating dish</h2>
          <p>Enter information to add a dish to your offer</p>
          <Section>
            <NameInput
              type={'text'}
              placeholder={'Dish name'}
              name={'name'}
              maxLength={35}
              required
            />
            <div>
              <PriceInput
                type={'number'}
                placeholder={'Price'}
                name={'price'}
                step={'0.01'}
                min="0.00"
                max="100.00"
                required
              />
              <StyledSpan>$</StyledSpan>
            </div>
          </Section>
          <InputBox>
            <RadioBox>
              <div>
                <H3>Category</H3>
                <Section>
                  <PushInputBox>
                    <input
                      type={'radio'}
                      name={'category'}
                      value={'soup'}
                      required
                    />
                    <tag for={'soup'}>Soup</tag>
                  </PushInputBox>
                  <PushInputBox>
                    <input type={'radio'} name={'category'} value={'salad'} />
                    <tag for={'salad'}>Salad</tag>
                  </PushInputBox>
                  <PushInputBox>
                    <input type={'radio'} name={'category'} value={'other'} />
                    <tag for={'other'}>Other</tag>
                  </PushInputBox>
                </Section>
              </div>
              <div>
                <H3>Portion</H3>
                <Section>
                  <PushInputBox>
                    <input
                      type={'radio'}
                      name={'portion'}
                      value={'appetizer'}
                      required
                    />
                    <tag for={'appetizer'}>Appetizer</tag>
                  </PushInputBox>
                  <PushInputBox>
                    <input type={'radio'} name={'portion'} value={'entree'} />
                    <tag for={'entree'}>Entrée</tag>
                  </PushInputBox>
                </Section>
              </div>
            </RadioBox>
            <div>
              <H3>Labels</H3>
              <Section>
                <PushInputBox>
                  <input
                    type={'checkbox'}
                    name={'vegetarian'}
                    value={'vegetarian'}
                  />
                  <tag for={'vegetarian'}>Vegetarian</tag>
                </PushInputBox>
                <PushInputBox>
                  <input type={'checkbox'} name={'vegan'} value={'vegan'} />
                  <tag for={'vegan'}>Vegan</tag>
                </PushInputBox>
                <PushInputBox>
                  <input type={'checkbox'} name={'lowfat'} value={'lowfat'} />
                  <tag for={'lowfat'}>Low-fat</tag>
                </PushInputBox>
                <PushInputBox>
                  <input type={'checkbox'} name={'meat'} value={'meat'} />
                  <tag for={'meat'}>Meat</tag>
                </PushInputBox>
              </Section>
            </div>
            <div>
              <H3>Days on the menu</H3>
              <DayBox>
                <PushInputBox>
                  <input type={'checkbox'} name={'mon'} value={'mon'} />
                  <tag for={'mon'}>Monday</tag>
                </PushInputBox>
                <PushInputBox>
                  <input type={'checkbox'} name={'tue'} value={'tue'} />
                  <tag for={'tue'}>Tuesday</tag>
                </PushInputBox>
                <PushInputBox>
                  <input type={'checkbox'} name={'wed'} value={'wed'} />
                  <tag for={'wed'}>Wednesday</tag>
                </PushInputBox>
                <PushInputBox>
                  <input type={'checkbox'} name={'thu'} value={'thu'} />
                  <tag for={'thu'}>Thursday</tag>
                </PushInputBox>
                <PushInputBox>
                  <input type={'checkbox'} name={'fri'} value={'fri'} />
                  <tag for={'fri'}>Friday</tag>
                </PushInputBox>
                <PushInputBox>
                  <input type={'checkbox'} name={'sat'} value={'sat'} />
                  <tag for={'sat'}>Saturday</tag>
                </PushInputBox>
                <PushInputBox>
                  <input type={'checkbox'} name={'sun'} value={'sun'} />
                  <tag for={'sun'}>Sunday</tag>
                </PushInputBox>
              </DayBox>
            </div>
          </InputBox>
          <div>
            <H3>Search tags</H3>
            <TextInput type={'text'} name={'tag1'} placeholder={'Tag 1'} />
            <TextInput type={'text'} name={'tag2'} placeholder={'Tag 2'} />
            <TextInput type={'text'} name={'tag3'} placeholder={'Tag 3'} />
          </div>
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
          <Btn type={'submit'} value={'Create Dish'} />
        </StyledForm>
      ) : (
        <InnerWrap>
          <img src={SOTD1} />
          <p>Dish succesfully created!</p>
          <p>Thank you for participating in this development</p>
        </InnerWrap>
      )}
    </OverWrap>
  );
};

const TextInput = styled.input`
  min-width: 120px;
  /* width: 30vw; */
  padding: 6px 12px;
  margin: 5px;
  font-size: 0.8rem;
  border: none;
  border-radius: 3px;

  &:focus {
    outline: none;
  }
`;

const RadioBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;
const NameInput = styled.input`
  min-width: 120px;
  width: 35vw;
  padding: 6px 12px;
  margin: 5px;
  font-size: 0.9rem;
  border: none;
  border-radius: 3px;

  &:focus {
    outline: none;
  }
`;

const PushInputBox = styled.div`
  padding: 3px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  width: 80%;
`;

const PriceInput = styled.input`
  min-width: 20px;
  /* width: 30vw; */
  padding: 6px 12px;
  /* margin: 5px; */
  font-size: 0.9rem;
  border: none;
  border-radius: 3px 0 0 3px;
  padding-right: 0;

  &:focus {
    outline: none;
  }
`;
const StyledSpan = styled.span`
  padding: 6px 12px;
  /* margin: 5px; */
  font-size: 0.8rem;
  border: none;
  border-radius: 0 3px 3px 0;
  background: white;
`;

const DayBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  /* justify-content: center; */
`;

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
const InnerWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  padding-bottom: 25vh;
  height: 80vh;
  background: rgb(238, 229, 186);
  width: 80vw;
  > p {
    padding: 10px;
  }
`;

const Section = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  /* width: 90%; */
`;

const H3 = styled.h3`
  font-size: 1rem;
  padding: 3px;
`;

const OverWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 92vh;
`;

const FakeInput = styled.input`
  width: 70%;
  text-align: center;
  padding: 4px 10px;
  border-radius: 5px 0 0 5px;
  border: none;
  text-overflow: ellipsis;
  font-size: 0.8rem;
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

const Btn = styled.input`
  color: rgb(238, 229, 186);
  background: rgb(204, 88, 3);
  width: 50%;
  padding: 10px;
  font-size: 0.9rem;
  border: none;
  border-radius: 3px;
`;
export default CreateDish;
