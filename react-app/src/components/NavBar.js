
import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import "./NavBar.css"
import { useSelector } from "react-redux";
import logo from "./Logo.png"

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <nav className='nav'>

      <div className='bannerdiv'>

        <div className='banner'><Route exact path='/'><img className='logo' src={logo}></img></Route></div>
      </div>

      <ul className='navstuff'>
        <li className='navli'>
          <NavLink className='navli' to='/' exact={true} activeClassName='active'>
            <img className='ball' src="https://pngimg.com/uploads/volleyball/volleyball_PNG1.png"></img>
            <div className='labell'>Home</div>
          </NavLink>
        </li>
        {!sessionUser && <li className='navli'>
          <NavLink className='navli' to='/login' exact={true} activeClassName='active'>
            <img className='ball' src="https://pngimg.com/uploads/volleyball/volleyball_PNG1.png"></img>
            <div className='labell'>Login</div>
          </NavLink>
        </li>}
        {!sessionUser && <li className='navli'>
          <NavLink className='navli' to='/sign-up' exact={true} activeClassName='active'>
            <img className='ball' src="https://pngimg.com/uploads/volleyball/volleyball_PNG1.png"></img>
            <div className='labell'>SignUp</div>
          </NavLink>
        </li>}
        {/* {sessionUser && <li className='navli'>
          <NavLink className='navli' to='/users' exact={true} activeClassName='active'>
            <img className='ball' src="https://pngimg.com/uploads/volleyball/volleyball_PNG1.png"></img>
            <div className='labell'>Users</div>
          </NavLink>
        </li>} */}
        {sessionUser && <li className='navli'>
          <LogoutButton />
        </li>}
      </ul>
    </nav>
  );
}

export default NavBar;
