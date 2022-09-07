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
import { leaveTeamThunk, ourTeamThunk } from './store/teammember'
import { getPostsThunk } from './store/post'
import { applyTeamThunk } from './store/teammember'

function App() {
  const [loaded, setLoaded] = useState(false);
  const [currentTeam, setCurrentTeam] = useState('')
  const sessionUser = useSelector(state => state.session.user)
  const teamMember = useSelector(state => state.members.yourTeam)
  const thisTeamMembers = useSelector(state => state.members.ourTeam)
  const [hidden, setHidden] = useState(false)
  const [button1, setButton1] = useState(true)
  const [button2, setButton2] = useState(true)
  const [button3, setButton3] = useState(true)
  const [makePost, setMakePost] = useState(false)
  const [upload, setUpload] = useState(false)
  console.log(sessionUser)
  console.log(currentTeam)
  console.log(teamMember)
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

          {sessionUser && <TeamList upload={upload} setUpload={setUpload} makePost={makePost} setMakePost={setMakePost} teamMember={teamMember} sessionUser={sessionUser} setHidden={setHidden} setCurrentTeam={setCurrentTeam} button1={button1} setButton1={setButton1} button2={button2} setButton2={setButton2} button3={button3} setButton3={setButton3} />}

        </div>
        <div id='length'>

          <Switch>

            <Route exact path='/teams/:teamId'>
              <NavBar currentTeam={currentTeam} setCurrentTeam={setCurrentTeam} />
            </Route>
            <Route exact path='/post/:postId'>
              <NavBar currentTeam={currentTeam} setCurrentTeam={setCurrentTeam} />
            </Route>
            <NavBar currentTeam={currentTeam} setCurrentTeam={setCurrentTeam} />

          </Switch>
          <Home upload={upload} setUpload={setUpload} makePost={makePost} setMakePost={setMakePost} currentTeam={currentTeam} setCurrentTeam={setCurrentTeam} sessionUser={sessionUser} teamMember={teamMember}
            thisTeamMembers={thisTeamMembers} button1={button1} setButton1={setButton1} button2={button2} setButton2={setButton2} button3={button3} setButton3={setButton3} hidden={hidden} setHidden={setHidden} loaded={loaded} setLoaded={setLoaded}
          />
        </div>
        <div className='lastdiv'>
          <ProtectedRoute path='/teams/:teamId' exact={true}>
            {sessionUser && currentTeam && <h2 id='userlisttitle'>Members</h2>}
            {sessionUser && <ul className="userlistpole">
              {currentTeam && Array.isArray(thisTeamMembers) && thisTeamMembers.map(member => (
                <li className='liuserpole' key={member.id}><NavLink className='userlinkpole' onClick={() => { setCurrentTeam('') }} to={`/users/${member.id}`} >{member.username}</NavLink></li>
              ))}
            </ul>}
          </ProtectedRoute>
          <div id='linkedindiv'>
            <Switch>

              {sessionUser && teamMember && currentTeam.captainId != sessionUser.id && currentTeam.id == teamMember.teamId && teamMember != 'none' && <ProtectedRoute path='/teams/:teamId'>
                <button className='leaveteam' onClick={async (e) => {
                  await dispatch(leaveTeamThunk(sessionUser.id, currentTeam.id))
                  await dispatch(ourTeamThunk(currentTeam.id))
                  await dispatch(getPostsThunk((currentTeam.id)))

                }}>Leave Team</button></ProtectedRoute>}
              {/* {sessionUser && teamMember && teamMember.teamId &&
                <NavLink className='leaveteam' to={`/teams/${teamMember.teamId}`}>Your Team</NavLink>
              } */}
              <ProtectedRoute path='/teams/:teamId'>
                {sessionUser && teamMember && teamMember === 'none' && <button className='leaveteam' onClick={async (e) => {
                  await dispatch(applyTeamThunk(sessionUser.id, currentTeam.id))
                  await dispatch(ourTeamThunk(currentTeam.id))
                  await dispatch(getPostsThunk(currentTeam.id))
                }}>Join Team</button>}
              </ProtectedRoute>

            </Switch>

            <a id="linkedin" href="https://www.linkedin.com/in/brendan-lau-b6952919a/"><img className="linkedinimg" src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png'></img></a>
            <a id="linkedin" href="https://github.com/BrenLau"><img className="linkedinimg" src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'></img></a>
          </div>
        </div>
      </div>

    </BrowserRouter>
  );
}

export default App;
