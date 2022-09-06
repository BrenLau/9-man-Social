import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import './User.css'

function User({ setCurrentTeam }) {
  const [user, setUser] = useState({});
  const { userId } = useParams();

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  console.log(user)
  return (
    <div className='ulBoxdiv' style={{
      backgroundImage: `url(${user.team ? user.team.image : 'none'})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%'
    }} >

      <ul className='ulBox'>
        <li>
          <strong>User Id</strong> {userId}
        </li>
        <li>
          <strong>Username</strong> {user.username}
        </li>
        <li>
          <strong>Email</strong> {user.email}
        </li>
        {user.team && <li className='teamli'><NavLink className='teamname' onClick={() => { setCurrentTeam(user.team.id) }} to={`/teams/${user.team.id}`}>{user.team.name}</NavLink></li>}
      </ul>
    </div>
  );
}
export default User;
