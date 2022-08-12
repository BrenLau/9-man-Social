import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './loginform.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [front, setFront] = useState([])
  const [submitted, setSubmitted] = useState(false)

  const onSignUp = async (e) => {
    e.preventDefault();
    if (front.length > 0) {
      setSubmitted(true)
      return
    }
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        const arr = []
        data.forEach(info => {
          const split = info.split(':')
          arr.push(split[1])
        })
        setErrors(arr)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  useEffect(() => {
    const errors = []
    if (username.length < 5 || username.length > 20) errors.push('Username must be between 5 and 20 characters')
    if (password !== repeatPassword) errors.push('Password and confirm password must match')
    if (!password) errors.push('Password cannot be empty')
    if (!repeatPassword) errors.push('Confirm Password cannot be empty')

    setFront(errors)
  }, [username, password, repeatPassword])

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form className='loginform' onSubmit={onSignUp}>
      <div className='logindiv'>
        <h2>Sign Up</h2>

        <div className='errordiv'>
          {submitted && front.length > 0 && front.map(err => (
            <div className='eacherrordiv'>{err}</div>
          ))}
          {errors.map((error, ind) => (
            <div className='eacherrordiv' key={ind}>{Object.values(error)}</div>
          ))}
        </div>
        <div>
          <label>User Name*</label>
          <input
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div>
          <label>Email*</label>
          <input
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div>
          <label>Password*</label>
          <input
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div>
          <label>Confirm Password*</label>
          <input
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <button className='submit-btn' disabled={submitted && front.length} type='submit'>Sign Up</button>
      </div>
    </form>
  );
};

export default SignUpForm;
