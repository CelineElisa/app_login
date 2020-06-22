import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Success from './Success'

import '../App.css';

const LogPage = () => {

  const [logins, setLogins] = useState(null)
  const [userEmail, setUserEmail] = useState(null)
  const [userPassword, setUserPassword] = useState(null)
  const [goodLogins, setGoodLogins] = useState(null)

  const getUserLogins = () => {
    axios
      .get('http://localhost:8050/loging')
      .then((res) => setLogins(res.data))
  }

  const handleEmail = (event) => {
    const userEmail = event.target.value;
    setUserEmail(userEmail)
  }

  const handlePassword = (event) => {
    const userPassword = event.target.value;
    setUserPassword(userPassword)
  }

  const testLogins = () => {
    if(logins[0].email === userEmail && logins[0].password === userPassword){
      setGoodLogins(true)
    } else if(logins[0].email === userEmail){
      setGoodLogins('Incorrect password')
    } else if(logins[0].password === userPassword){
      setGoodLogins('Incorrect email')
    } else {
      setGoodLogins('Incorrect password and email')
    }
  }

  useEffect(() => getUserLogins(), [])
  
  return ( goodLogins === true ? 
    (
      <Success/>
    ):(
    <div className="LogPage">
      <h2>Welcome, Please Log in</h2>
      <input id="email" placeholder="your email" onChange={(event) => handleEmail(event)}></input>
      <input type="password" id="password" placeholder="your password" onChange={(event => handlePassword(event))}></input>
      <button id='button' onClick={()=>testLogins()}>Sign in</button>
      {goodLogins === null ? <></> :<p className="error">{goodLogins}</p>}
    </div>
  ))
}

export default LogPage
