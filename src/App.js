import { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import requests from "./api/request";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Row from "./components/Row";
import DetailPage from "./routes/DetailPage";
import MainPage from "./routes/MainPage";
import SearchPage from "./routes/SearchPage";
import './styles/App.css'

import { getAuth, onAuthStateChanged } from "firebase/auth";
import Routers from "./Routers";
import { authService } from "./fbase";

function App() {
  const [init, setInit] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(()=>{
      onAuthStateChanged( authService, (user) => {
      if (user) {
      // User is signed in
      setIsLoggedIn(user);
      setUserInfo(user);
      // const uid = user.uid;
    } else {
      setInit(true);
    }
  });
},[])
console.log(authService.currentUser);

  return (
    <div className="app">
      {init ? (
        <Routers isLoggedIn={Boolean(userInfo)} userInfo={userInfo} /> ): "initializing…"}
    </div>
  );
}

export default App;
