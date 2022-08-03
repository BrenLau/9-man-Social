import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';

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
    <ul>
      <li>
        <strong>User Id</strong> {userId}
      </li>
      <li>
        <strong>Username</strong> {user.username}
      </li>
      <li>
        <strong>Email</strong> {user.email}
      </li>
      {user.team && <li><NavLink onClick={() => { setCurrentTeam(user.team.id) }} to={`/teams/${user.team.id}`}>{user.team.name}</NavLink></li>}
    </ul>
  );
}
export default User;
