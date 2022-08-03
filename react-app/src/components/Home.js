import "./Home.css"
import React, { useState, useEffect } from 'react';
import { BrowserRouter, NavLink, Route, Switch, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './auth/LoginForm';
import SignUpForm from './auth/SignUpForm';
import ProtectedRoute from './auth/ProtectedRoute';
import UsersList from './UsersList';
import User from './User';
import CreateTeam from "./createATeam";
import { authenticate } from '../store/session';
import { useSelector } from "react-redux";
import TeamList from "./teamList";
import TeamPage from "./TeamPage";
import UpdateTeam from "./updateTeam";
import { yourTeamThunk, ourTeamThunk } from "../store/teammember";

const Home = ({ currentTeam, setCurrentTeam }) => {
    const sessionUser = useSelector(state => state.session.user)
    const teamMember = useSelector(state => state.members.yourTeam)
    const thisTeamMembers = useSelector(state => state.members.ourTeam)
    console.log(thisTeamMembers)
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();
    // const [currentTeam, setCurrentTeam] = useState('')
    console.log(window.location.pathname)

    useEffect(() => {
        console.log(currentTeam)
        if (currentTeam) {
            dispatch(ourTeamThunk(currentTeam))
        }
    }, [currentTeam])

    if (window.location.pathname === '/') setCurrentTeam('')

    useEffect(() => {
        (async () => {
            await dispatch(authenticate());
            setLoaded(true);
        })();
    }, [dispatch]);

    useEffect(() => {
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
                {sessionUser && teamMember === 'none' && <NavLink className='createteam' to='/createNewTeam'>
                    Create a team
                </NavLink>}
                {sessionUser && <TeamList setCurrentTeam={setCurrentTeam} />}
            </div>

            {/* _____________________________________________________________________ */}

            <Switch>
                <Route path='/login' exact={true}>
                    <LoginForm />
                </Route>
                <Route path='/sign-up' exact={true}>
                    <SignUpForm />
                </Route>
                <ProtectedRoute path='/users' exact={true} >
                    <UsersList />
                </ProtectedRoute>
                <ProtectedRoute path='/users/:userId' exact={true} >
                    <User setCurrentTeam={setCurrentTeam} />
                </ProtectedRoute>
                <ProtectedRoute path='/createNewTeam' exact={true}>
                    <CreateTeam />
                </ProtectedRoute>
                <ProtectedRoute path='/editteam/:teamId' exact={true}><UpdateTeam /></ProtectedRoute>
                <ProtectedRoute path='/teams/:teamId' exact={true}><TeamPage setCurrentTeam={setCurrentTeam} /></ProtectedRoute>
            </Switch>

            {/* _________________________________________________________________________________ */}

            <div className='poles'>
                {sessionUser && <ul className="userlistpole">
                    {currentTeam && <h2 id='userlisttitle'>Members</h2>}
                    {currentTeam && Array.isArray(thisTeamMembers) && thisTeamMembers.map(member => (
                        <li className='liuserpole' key={member.id}><NavLink className='userlinkpole' onClick={() => { setCurrentTeam('') }} to={`/users/${member.id}`} >{member.username}</NavLink></li>
                    ))}
                </ul>}

            </div>
        </div>

    )
}

export default Home
