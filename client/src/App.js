import React, { useEffect, createContext, useReducer, useContext } from 'react';
import Navbar from './component/Navbar';
import './App.css';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import Home from './component/screens/Home';
import Signin from './component/screens/Signin';
import Signup from './component/screens/Signup';
import Challenges from './component/screens/Challenges';
import { reducer, initialState } from './reducer/userReducer';
import ChallengeDetails from './component/screens/ChallengeDetails';

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    dispatch({ type: 'USER', payload: user });
    if (user) history.push('/');
    else history.push('/signin');
  }, [dispatch, history]);

  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/signin">
        <Signin />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/create-challenge">
        <Challenges />
      </Route>
      <Route path="/challenge-details">
        <ChallengeDetails />
      </Route>
    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
