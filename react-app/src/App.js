import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import Home from './components/Home'
function App() {
  const [loaded, setLoaded] = useState(false);
  const [currentTeam, setCurrentTeam] = useState('')

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>

        <Route exact path='/teams/:teamId'>
          <NavBar currentTeam={currentTeam} setCurrentTeam={setCurrentTeam} />
        </Route>
        <Route exact path='/post/:postId'>
          <NavBar currentTeam={currentTeam} setCurrentTeam={setCurrentTeam} />
        </Route>
        <NavBar currentTeam={currentTeam} setCurrentTeam={setCurrentTeam} />

      </Switch>
      <Home currentTeam={currentTeam} setCurrentTeam={setCurrentTeam} />

    </BrowserRouter>
  );
}

export default App;
