import React, { useState } from 'react'
import { useEffect } from 'react';
import { Outlet, Route, Routes } from "react-router-dom";
import requests from "./api/request";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Row from "./components/Row";
import DetailPage from "./routes/DetailPage";
import Login from './routes/Login';
import MainPage from "./routes/MainPage";
import Myprofile from './routes/Myprofile';
import SearchPage from "./routes/SearchPage";

function Routers({isLoggedIn,userInfo}) {
  const [show, setShow] = useState(true);

  const Layout =() => {
    return(
      <div>
        <Nav userInfo={userInfo}/>
        <Outlet/>
        <Footer/>
      </div>
    )}

  return (
    <Routes>
      {isLoggedIn ? (
      <Route path="/" element={<Layout userInfo={userInfo}/>}>
        <Route path='myprofile' element={<Myprofile 
        userInfo={userInfo} Layout={Layout} setShow={setShow}/>}/>
        <Route index element={<MainPage userInfo={userInfo}/>}/>
        <Route path="movieId" element={<DetailPage userInfo={userInfo}/>}/>
        <Route path="search" element={<SearchPage userInfo={userInfo}/>}/>
      </Route>):(
      <Route path='/' element={<Login />}/> )}  
    </Routes>
  )
}

export default Routers