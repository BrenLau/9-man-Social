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

import TeamPage from "./TeamPage";
import UpdateTeam from "./updateTeam";
import { yourTeamThunk, ourTeamThunk } from "../store/teammember";
import Splash from "./splash";
import Post from "./post";

const Home = ({ upload, setUpload, currentTeam, setCurrentTeam, sessionUser, teamMember, thisTeamMembers, hidden, setHidden, loaded, setLoaded, button1, setButton1, button2, setButton2, button3, setButton3, makePost, setMakePost }) => {
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
        <>
            <div id="poles">
                <div className='poles'>
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
                    <ProtectedRoute path='/teams/:teamId' exact={true}><TeamPage upload={upload} setUpload={setUpload} makePost={makePost} setMakePost={setMakePost} thisTeamMembers={thisTeamMembers} sessionUser={sessionUser} setHidden={setHidden} hidden={hidden} setCurrentTeam={setCurrentTeam} teamMember={teamMember} button1={button1} setButton1={setButton1} button2={button2} setButton2={setButton2} button3={button3} setButton3={setButton3} /></ProtectedRoute>
                    <ProtectedRoute path='/post/:postId' exact={true}><Post teamMember={teamMember} /></ProtectedRoute>
                </Switch>

                {/* _________________________________________________________________________________ */}

                <div className='poles'>
                </div>
            </div>
        </>

    )
}

export default Home
