import React from 'react'
import LoginForm from './LoginForm'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { au } from '../fbase';

export default function Login() {

    const onSocialClick = (e) => {
        // console.log(e.target.name)
        const {target: {name}} = e;
        let provider
        if(name === "google"){
          provider = new GoogleAuthProvider();
        }
        const data = signInWithPopup(au, provider)
        console.log(data);
      }

  return (
    <div className='login-container'>
        <LoginForm/>
        <div className='loginBtns'>
            <button onClick={onSocialClick} name="google">Continue with Google</button>
        </div>
    </div>
  )
}
