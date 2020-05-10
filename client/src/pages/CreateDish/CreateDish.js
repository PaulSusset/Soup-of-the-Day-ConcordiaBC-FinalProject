import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { displayMap } from '../../actions';
import styled from 'styled-components';

const CreateDish = () => {
  const user = useSelector((state) => state.restoActions.currentUser);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(displayMap(false));

    return () => dispatch(displayMap(true));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    console.log(response);
  };

  return (
    <>
      <h2>Creating dish</h2>
      <p>Enter information to add a dish to your offer</p>
      <StyledForm onSubmit={(e) => handleSubmit(e)}>
        <TextInput
          type={'text'}
          placeholder={'Dish name'}
          name={'name'}
          maxLength={35}
          required
        />
        <TextInput
          type={'number'}
          placeholder={'Price'}
          name={'price'}
          step={'0.01'}
          min="0.00"
          max="100.00"
          required
        />
        <span>$</span>
        <div>
          <h3>Category</h3>
          <tag for={'soup'}>Soup</tag>
          <input type={'radio'} name={'category'} value={'soup'} required />
          <tag for={'salad'}>Salad</tag>
          <input type={'radio'} name={'category'} value={'salad'} />
          <tag for={'other'}>Other</tag>
          <input type={'radio'} name={'category'} value={'other'} />
        </div>
        <div>
          <h3>Portion</h3>
          <tag for={'appetizer'}>Appetizer</tag>
          <input type={'radio'} name={'portion'} value={'appetizer'} required />
          <tag for={'entree'}>Entrée</tag>
          <input type={'radio'} name={'portion'} value={'entree'} />
        </div>
        <div>
          <h3>Labels</h3>
          <tag for={'vegetarian'}>Vegetarian</tag>
          <input type={'checkbox'} name={'vegetarian'} value={'vegetarian'} />
          <tag for={'vegan'}>Vegan</tag>
          <input type={'checkbox'} name={'vegan'} value={'vegan'} />
          <tag for={'lowfat'}>Low-fat</tag>
          <input type={'checkbox'} name={'lowfat'} value={'lowfat'} />
          <tag for={'meat'}>Meat</tag>
          <input type={'checkbox'} name={'meat'} value={'meat'} />
        </div>
        <div>
          <h3>Days on the menu</h3>
          <tag for={'mon'}>Monday</tag>
          <input type={'checkbox'} name={'mon'} value={'mon'} />
          <tag for={'tue'}>Tuesday</tag>
          <input type={'checkbox'} name={'tue'} value={'tue'} />
          <tag for={'wed'}>Wednesday</tag>
          <input type={'checkbox'} name={'wed'} value={'wed'} />
          <tag for={'thu'}>Thursday</tag>
          <input type={'checkbox'} name={'thu'} value={'thu'} />
          <tag for={'fri'}>Friday</tag>
          <input type={'checkbox'} name={'fri'} value={'fri'} />
          <tag for={'sat'}>Saturday</tag>
          <input type={'checkbox'} name={'sat'} value={'sat'} />
          <tag for={'sun'}>Sunday</tag>
          <input type={'checkbox'} name={'sun'} value={'sun'} />
        </div>
        <div>
          <h3>Search tags</h3>
          <TextInput type={'text'} name={'tag1'} placeholder={'Tag 1'} />
          <TextInput type={'text'} name={'tag2'} placeholder={'Tag 2'} />
          <TextInput type={'text'} name={'tag3'} placeholder={'Tag 3'} />
        </div>
        <div>
          <input type={'file'} name={'image'} required />
        </div>
        <input type={'submit'} value={'Create Dish'} />
      </StyledForm>
    </>
  );
};

const TextInput = styled.input`
  border: 1px grey solid;
`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export default CreateDish;
