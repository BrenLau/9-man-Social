import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";

import { useDispatch } from 'react-redux';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import Home from './components/Home'
import TeamList from './components/teamList';
import './index.css'

function App() {
  const [loaded, setLoaded] = useState(false);
  const [currentTeam, setCurrentTeam] = useState('')
  const sessionUser = useSelector(state => state.session.user)
  const teamMember = useSelector(state => state.members.yourTeam)
  const thisTeamMembers = useSelector(state => state.members.ourTeam)
  const [hidden, setHidden] = useState(false)

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
      <div id='everything'>

        <div className='teamlistnewdiv'>

          {sessionUser && <TeamList teamMember={teamMember} sessionUser={sessionUser} setHidden={setHidden} setCurrentTeam={setCurrentTeam} />}
          <div>

            <Switch>

              <Route exact path='/teams/:teamId'>
                <NavBar currentTeam={currentTeam} setCurrentTeam={setCurrentTeam} />
              </Route>
              <Route exact path='/post/:postId'>
                <NavBar currentTeam={currentTeam} setCurrentTeam={setCurrentTeam} />
              </Route>
              <NavBar currentTeam={currentTeam} setCurrentTeam={setCurrentTeam} />

            </Switch>
            <Home currentTeam={currentTeam} setCurrentTeam={setCurrentTeam} sessionUser={sessionUser} teamMember={teamMember}
              thisTeamMembers={thisTeamMembers} hidden={hidden} setHidden={setHidden} loaded={loaded} setLoaded={setLoaded}
            />
          </div>

        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
