import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from 'react-icons-kit';
import { menu } from 'react-icons-kit/feather/menu';
import styled, { keyframes, css } from 'styled-components';

import { logOut } from '../../actions';
import Logo1 from '../../assets/SOTD1.png';
import Logo2 from '../../assets/SOTD2.png';

const Dropdown = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [displaying, setDisplaying] = useState(false);
  const [logoHover, setLogoHover] = useState(false);
  const loggedIn = useSelector((state) => state.restoActions.loggedIn);

  useEffect(() => {
    setDisplaying(false);
  }, [location]);

  return (
    <div
      style={{
        position: 'absolute',
        width: '100vw',
        zIndex: '10',
        background: 'rgb(204, 88, 3)',
      }}
    >
      <OverWrap>
        <Logo
          onMouseDown={() => setLogoHover(true)}
          onMouseUp={() => setLogoHover(false)}
          onTouchStart={() => setLogoHover(true)}
          onTouchEnd={() => setLogoHover(false)}
          onClick={() => history.push('/')}
          src={logoHover ? Logo1 : Logo2}
        />
        <Title>Soup of the Day</Title>
        <IconBox onClick={() => setDisplaying(!displaying)}>
          <StyledIcon
            icon={menu}
            go={displaying ? true : false}
            size={'1.5rem'}
          />
        </IconBox>
      </OverWrap>
      <>
        <DropBox>
          <DropdownOptions displaying={displaying}>
            <Option onClick={() => history.push('/')}>Home</Option>{' '}
            {!loggedIn ? (
              <Option onClick={() => history.push('/login')}>Log in</Option>
            ) : (
              <>
                <Option onClick={() => history.push('/adminhome')}>
                  Actions
                </Option>
                <Option onClick={() => history.push('/createdish')}>
                  Create Dish
                </Option>
                <Option
                  onClick={() => {
                    dispatch(logOut());
                    history.push('/');
                  }}
                >
                  Log Out
                </Option>
              </>
            )}
          </DropdownOptions>
        </DropBox>
      </>
      {/* )} */}
    </div>
  );
};

const Title = styled.h1`
  font-family: 'Yellowtail', cursive;
  /* font-family: 'Yellowtail', cursive; */
  color: rgb(238, 229, 186);
`;

const DropdownOptions = styled.ul`
  position: absolute;
  right: 0;
  background: rgb(238, 229, 186);
  color: rgb(204, 88, 3);
  z-index: -1;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: 2000ms ease-in-out;
  animation: ${(props) =>
    props.displaying
      ? css`
          ${slideIn} 200ms linear;
          animation-fill-mode: forwards;
        `
      : css`
          ${slideOut} 200ms linear;
          animation-fill-mode: forwards;
        `};
`;

const Option = styled.li`
  text-align: center;
  padding: 3px;
  z-index: 3;
  &:hover {
    background: rgb(204, 88, 3);
    color: rgb(238, 229, 186);
  }
`;

const IconBox = styled.div`
  display: flex;
  padding: 4px;
  padding-right: 10px;
  justify-content: center;
  align-items: center;
  height: 7vh;
  width: 7vh;
  color: rgb(238, 229, 186);
`;

const DropBox = styled.div`
  /* display: block; */
`;

const Logo = styled.img`
  height: 7vh;
  width: 7vh;
  /* padding: 4px; */
  margin: 0;
`;
const OverWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* position: relative; */
  width: 100%;
  position: sticky;
  background: rgb(204, 88, 3);
  height: 7vh;
  z-index: 5;
  padding: 0;
  margin: 0;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg)
  }
  to {
    transform: rotate(-90deg)
  }
`;

const unrotate = keyframes`
  from {
    transform: rotate(-90deg)
  }
  to {
    transform: rotate(0deg)
  }
`;

const slideIn = keyframes`
from {
  top: 0%;
    bottom: 100%;
    opacity: 0;
    animation-fill-mode: forwards;
}
    to {
    top: 100%;
    bottom: '';
    opacity: 1;
    animation-fill-mode: forwards;
  }
`;

const slideOut = keyframes`
from {
  top: 100%;
    bottom: ''
    opacity: 1;
}
    to {
    opacity: 0;
    top: 0%;
    bottom: 100%;
  }`;

const StyledIcon = styled(Icon)`
  animation: ${(props) =>
    props.go
      ? css`
          ${rotate} 200ms ease-in-out;
          animation-fill-mode: forwards;
        `
      : css`
          ${unrotate} 200ms ease-in-out;
          animation-fill-mode: forwards;
        `};
`;

export default Dropdown;
