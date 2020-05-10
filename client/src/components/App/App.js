import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUserLocation, setCentering } from '../../actions';
import styled from 'styled-components';
import GlobalStyles from '../../GlobalStyles';

// Pages
import Homepage from '../../pages/Homepage';
import Contact from '../../pages/Contact';
import Login from '../../pages/Login';
import Restaurant from '../../pages/Restaurant';
import Header from '../Header';
import MapFuncs from '../../pages/MapFuncs';
import Details from '../../pages/Details';
import CreateAccount from '../../pages/CreateAccount';
import AdminHome from '../../pages/AdminHome';
import CreateDish from '../../pages/CreateDish';

const App = () => {
  const loggedIn = useSelector((state) => state.restoActions.loggedIn);
  return (
    <Router>
      <GlobalStyles />
      <Header />
      <MapFuncs />
      <Switch>
        <Route exact path="/">
          <Wrapper>
            <Homepage />
          </Wrapper>
        </Route>
        <Route path="/login">
          {loggedIn ? <Redirect to={'/adminhome'} /> : <Login />}
        </Route>
        <Route path="/search">search results</Route>
        <Route path="/category">category</Route>
        <Route path="/restaurant/:id">
          <Restaurant />
        </Route>
        <Route path="/accountcreation">
          {loggedIn ? <Redirect to={'/adminhome'} /> : <CreateAccount />}
        </Route>
        <Route path="/adminhome">
          {loggedIn ? <AdminHome /> : <Redirect to={'/login'} />}
        </Route>
        <Route path="/createdish">
          {loggedIn ? <CreateDish /> : <Redirect to={'/login'} />}
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
      </Switch>
    </Router>
  );
};

const Wrapper = styled.div`
  height: 52vh;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  background: 'rgb(238, 229, 186)';
`;

export default App;
