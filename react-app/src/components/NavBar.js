
import React from 'react';
import { NavLink, Route, Switch, useParams } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import "./NavBar.css"
import { useSelector } from "react-redux";
import logo from "./Logo.png"

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const { teamId, postId } = useParams()

  const teams = useSelector((state) => state.teams)
  const team = teams[parseInt(teamId)]

  const posts = useSelector((state) => state.posts)
  const post = posts[parseInt(postId)]

  return (
    <nav className='nav'>

      <div className='bannerdiv'>

        <div className='banner'>
          <Switch>
            <Route exact path='/'><><img className='logo' src={logo}></img><h2 id='splashh2'>A place where the nineman community can get together to organize and communicate amongst eachother in one centralized location.</h2></></Route>
            <Route exact path='/teams/:teamId'>{team && <h1 id='h1title'>{team.name}</h1>}</Route>
            <Route exact path='/post/:postId'>{post && <><h1 id='h1title'>{post.team.name}</h1><div id='descriptionid'>{post.team.description}</div></>}</Route>
          </Switch>
        </div>
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
