import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <div onClick={onLogout}><img className='ball' src="https://pngimg.com/uploads/volleyball/volleyball_PNG1.png"></img>
    <div className='labell'>Logout</div></div>;
};

export default LogoutButton;
