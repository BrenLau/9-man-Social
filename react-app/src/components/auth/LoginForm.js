import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './loginform.css'
import { yourTeamThunk } from '../../store/teammember';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    let errors = []
    if (email.length === 0) {
      errors.push('Email field must not be empty')
    }

    if (password.length === 0) {
      errors.push('Password field must not be empty')
    }
    if (errors.length) {
      setErrors(errors)
      return
    }
    const data = await dispatch(login(email, password));
    if (data.errors) {
      setErrors('Email or Password incorrect');
    } else {
      dispatch(yourTeamThunk(data.id))
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form className='loginform' onSubmit={onLogin}>
      <div className='logindiv'>
        <div className='errordiv'>
          <h2 id='signuph2'>Log In</h2>

          {!Array.isArray(errors) && <div className='eacherrordiv'>{errors}</div>}
          {Array.isArray(errors) && <div className='eacherrordiv'>{errors.map(err => <div>{err}</div>)}</div>}

        </div>

        <div className='divforinputs'>
          <label htmlFor='email'>Email*: </label>
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div className='divforinputs'>
          <label htmlFor='password'>Password*: </label>
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />
        </div>
        <button className="submit-btn" type='submit'>Login</button>
        <button
          className="submit-btn"
          onClick={() => {
            setPassword("password");
            setEmail("demo@aa.io");
          }}
        >
          Demo User
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
