import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Nav.css'

export default function Nav({userInfo}) {
    const [show, setShow] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const navigate = useNavigate()

    useEffect(()=>{
        window.addEventListener("scroll",()=>{
            // console.log("window.scrolly",window.scrollY);
            if(window.scrollY>50){
                setShow(true);
            }else{
                setShow(false);
            }
        });
        return () =>{
            window.removeEventListener("scroll",()=>{})
        }; //해당컴포넌트가 사용되지 않을땐 이벤트를 삭제. useEffect의 return은 해당컴포넌트가 사용되지 않을때 쓰는 조건
    },[]);

    const onChange = (e) => {
        setSearchValue(e.target.value);
        navigate(`/search?q=${e.target.value}`);
    }

  return (
    //show의값이 true일때 nav__black이라는 클래스 추가
    <nav className={`nav ${show && "nav__black"}`}> 
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png
    " alt="Netflix logo"  className='nav__logo'
    onClick={() => window.location.href = "https://seapearl98.github.io/netflix/"}/>
    <input type="text" value={searchValue} onChange={onChange}
    placeholder="영화를 검색해주세요" className='nav__input'/>
        <Link to='myprofile'>
        <img src="https://occ-0-4796-988.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41
        " alt="nav__avatar" className='nav__avatar'/>
        {userInfo.photoURL && (
            <img src={userInfo.photoURL} style={{width:"33px", height: "33px", objectFit:"cover", borderRadius:"5px"}} className='nav__avatar'/>
        )}
        </Link>
    </nav>
  )
}
