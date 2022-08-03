import "./Home.css"
import React, { useState, useEffect } from 'react';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './auth/LoginForm';
import SignUpForm from './auth/SignUpForm';
import NavBar from './NavBar';
import ProtectedRoute from './auth/ProtectedRoute';
import UsersList from './UsersList';
import User from './User';
import CreateTeam from "./createATeam";
import { authenticate } from '../store/session';
import { useSelector } from "react-redux";
import TeamList from "./teamList";
import { getTeamsThunk } from "../store/teams"

const Home = () => {
    const sessionUser = useSelector(state => state.session.user)
    const [loaded, setLoaded] = useState(false);
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

        <div id="poles">
            <div className='poles'>
                <NavLink to='/createNewTeam'>
                    Create a team
                </NavLink>
                {sessionUser && <TeamList />}
            </div>
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
                    <User />
                </ProtectedRoute>
                <ProtectedRoute path='/createNewTeam' exact={true}>
                    <CreateTeam />
                </ProtectedRoute>
            </Switch>
            <div className='poles'></div>
        </div>

    )
}

export default Home
