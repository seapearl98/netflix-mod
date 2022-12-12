import React from 'react'
import LoginForm from './LoginForm'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { authService } from '../fbase';
import '../styles/Login.css'

export default function Login() {

    const onSocialClick = (e) => {
        // console.log(e.target.name)
        const {target: {name}} = e;
        let provider
        if(name === "google"){
          provider = new GoogleAuthProvider();
        }
        const data = signInWithPopup(authService, provider)
        console.log(data);
      }

  return (
    <div className='login-container'>
      <h2 className='netflix_logo'>로고</h2>
        <LoginForm/>
        <div className='loginBtns'>
            <button onClick={onSocialClick} name="google">Continue with Google</button>
        </div>
    </div>
  )
}
