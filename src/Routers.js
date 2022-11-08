import React from 'react'
import { Outlet, Route, Routes } from "react-router-dom";
import requests from "./api/request";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Row from "./components/Row";
import DetailPage from "./routes/DetailPage";
import Login from './routes/Login';
import MainPage from "./routes/MainPage";
import SearchPage from "./routes/SearchPage";

function Routers({isLoggedIn,userInfo}) {

  const Layout =() => {
    return(
      <div>
        <Nav/>
        <Outlet/>
        <Footer/>
      </div>
    )
  }

  return (
    <Routes>
      {isLoggedIn ? (
      <Route path="/" element={<Layout/>}>
        <Route index element={<MainPage/>}/>
        <Route path="movieId" element={<DetailPage/>}/>
        <Route path="search" element={<SearchPage/>}/>
      </Route>):(<Route path='/' element={<Login/>}/> )}  
    </Routes>
  )
}

export default Routers