import React, { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { authService } from '../fbase';
import '../styles/LoginForm.css'


function LoginForm() {
    const [email, setEmail] = useState("")
    const [pw, setPw] = useState("")
    const [newAccount, setNewAccount] = useState(false);
    const [error, setError] = useState()

      const onChange = e => {
        const {target:{name, value}} = e;
        if(name === "email"){
          setEmail(value);
        }else if(name === "password"){
          setPw(value);
        }
      } //input에 입력된 email, password입력값을 가져오기 위한 함수

      const onSubmit = async (e) => {
        e.preventDefault();
        try {
          let data;
          if(newAccount){
              //create newAccount
              data = await createUserWithEmailAndPassword(authService, email, pw)
          }else{
              //login
              data = await signInWithEmailAndPassword(authService, email, pw)
          }
          //console.log(data);//회원가입을 마친 사용자 정보
        } catch (error) {
          // console.log(error);
          setError(error.message)
        }
      }
    
      const  toggleAccount = () => setNewAccount( (prev) => !prev );

  return (
    <div className='LoginForm'>
      <h3>로그인</h3>
        <form onSubmit={onSubmit}>
            <input type="email" name="email" value={email} onChange={onChange}
            className='emailinput input'/>
            <input type="password" name="password" value={pw} onChange={onChange}
            className='pwinput input'/>
            <input type="submit" value={newAccount ? "새로운 계정 만들기" : "로그인"}
            className='submit input'/>
            {error && <span className='login-error' style={{color:"red"}}>{error}</span>}
        </form>
        <span className='toggle-span' style={{color:"white"}}
        onClick={toggleAccount}>{newAccount ? "새로운 계정 만들기" : "로그인"}</span>
    </div>
  )
}

export default LoginForm