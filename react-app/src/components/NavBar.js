
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import "./NavBar.css"

const NavBar = () => {
  return (
    <nav className='nav'>
      <img className='banner' src="https://brensteamupsproject.s3.amazonaws.com/bigger9mansocial.png"></img>
      <ul className='navstuff'>
        <li className='navli'>
          <NavLink className='navli' to='/' exact={true} activeClassName='active'>
            <img className='ball' src="https://pngimg.com/uploads/volleyball/volleyball_PNG1.png"></img>
            <div className='labell'>Home</div>
          </NavLink>
        </li>
        <li className='navli'>
          <NavLink className='navli' to='/login' exact={true} activeClassName='active'>
            <img className='ball' src="https://pngimg.com/uploads/volleyball/volleyball_PNG1.png"></img>
            <div className='labell'>Login</div>
          </NavLink>
        </li>
        <li className='navli'>
          <NavLink className='navli' to='/sign-up' exact={true} activeClassName='active'>
            <img className='ball' src="https://pngimg.com/uploads/volleyball/volleyball_PNG1.png"></img>
            <div className='labell'>Sign up</div>
          </NavLink>
        </li>
        <li className='navli'>
          <NavLink className='navli' to='/users' exact={true} activeClassName='active'>
            <img className='ball' src="https://pngimg.com/uploads/volleyball/volleyball_PNG1.png"></img>
            <div className='labell'>Users</div>
          </NavLink>
        </li>
        <li className='navli'>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
