import "./Home.css"
import React, { useState, useEffect } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './auth/LoginForm';
import SignUpForm from './auth/SignUpForm';
import ProtectedRoute from './auth/ProtectedRoute';
import User from './User';
import CreateTeam from "./createATeam";
import { authenticate } from '../store/session';
import { useSelector } from "react-redux";
import TeamList from "./teamList";
import TeamPage from "./TeamPage";
import UpdateTeam from "./updateTeam";
import { yourTeamThunk, ourTeamThunk } from "../store/teammember";
import Splash from "./splash";
import Post from "./post";

const Home = ({ currentTeam, setCurrentTeam }) => {
    const sessionUser = useSelector(state => state.session.user)
    const teamMember = useSelector(state => state.members.yourTeam)
    const thisTeamMembers = useSelector(state => state.members.ourTeam)
    const [hidden, setHidden] = useState(false)
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();


    useEffect(() => {
        if (currentTeam) {
            dispatch(ourTeamThunk(currentTeam))
        }
    }, [dispatch, currentTeam])



    useEffect(() => {
        (async () => {
            await dispatch(authenticate());
            setLoaded(true);
        })();

        if (sessionUser) {
            dispatch(yourTeamThunk(sessionUser.id))
        }
    }, [dispatch])

    if (!loaded) {
        return null;
    }


    return (

        <div id="poles">
            <div className='poles'>
                {sessionUser && teamMember === 'none' && <NavLink onClick={() => setCurrentTeam('')} className='createteam' to='/createNewTeam'>
                    Create a team
                </NavLink>}
                {sessionUser && teamMember && teamMember !== 'none' && <NavLink className='createteam' to={`/teams/${teamMember.teamId}`} onClick={(e) => {
                    setCurrentTeam(teamMember.teamId)
                }}>Your Team</NavLink>}
                {sessionUser && <TeamList setHidden={setHidden} setCurrentTeam={setCurrentTeam} />}

            </div>

            {/* _____________________________________________________________________ */}

            <Route path='/' exact={true}>
                <Splash />
            </Route>
            <Switch>
                <Route path='/login' exact={true}>
                    <LoginForm />
                </Route>
                <Route path='/sign-up' exact={true}>
                    <SignUpForm />
                </Route>
                <ProtectedRoute path='/users/:userId' exact={true} >
                    <User setCurrentTeam={setCurrentTeam} />
                </ProtectedRoute>
                <ProtectedRoute path='/createNewTeam' exact={true}>
                    <CreateTeam />
                </ProtectedRoute>
                <ProtectedRoute path='/editteam/:teamId' exact={true}><UpdateTeam /></ProtectedRoute>
                <ProtectedRoute path='/teams/:teamId' exact={true}><TeamPage thisTeamMembers={thisTeamMembers} sessionUser={sessionUser} setHidden={setHidden} hidden={hidden} setCurrentTeam={setCurrentTeam} teamMember={teamMember} /></ProtectedRoute>
                <ProtectedRoute path='/post/:postId' exact={true}><Post teamMember={teamMember} /></ProtectedRoute>
            </Switch>

            {/* _________________________________________________________________________________ */}

            <div className='poles'>
                <ProtectedRoute path='/teams/:teamId' exact={true}>
                    {sessionUser && <ul className="userlistpole">
                        {currentTeam && <h2 id='userlisttitle'>Members</h2>}
                        {currentTeam && Array.isArray(thisTeamMembers) && thisTeamMembers.map(member => (
                            <li className='liuserpole' key={member.id}><NavLink className='userlinkpole' onClick={() => { setCurrentTeam('') }} to={`/users/${member.id}`} >{member.username}</NavLink></li>
                        ))}
                    </ul>}
                </ProtectedRoute>
                <div id='linkedindiv'>
                    <a id="linkedin" href="https://www.linkedin.com/in/brendan-lau-b6952919a/"><img className="linkedinimg" src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png'></img></a>
                    <a id="linkedin" href="https://github.com/BrenLau"><img className="linkedinimg" src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'></img></a>
                </div>
            </div>
        </div>

    )
}

export default Home
