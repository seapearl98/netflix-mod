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
import { au } from "./fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(()=>{
      onAuthStateChanged( au, (user) => {
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
console.log(au.currentUser);

  return (
    <div className="app">
      {init ? (
        <Routers isLoggedIn={Boolean(userInfo)} userInfo={userInfo} /> ): "initializing…"}
      {/* <Nav/>
      <Banner/>
      <Row title="NETFLIX ORIGINALS" id="NO" fetchUrl={requests.fetchNetflixOriginals} isLargeRow/>
      <Row title="Trending Now" id="TN" fetchUrl={requests.fetchTrending}/>
      <Row title="Top Rated" id="TR" fetchUrl={requests.fetchTopRated}/>
      <Row title="Action Movie" id="AM" fetchUrl={requests.fetchActionMovies}/>
      <Row title="Documentaries" id="DM" fetchUrl={requests.fetchDocumentaries} />
      <Row title="Romance Movie" id="RM" fetchUrl={requests.fetchRomanceMovies}/>
      <Row title="Science Fiction Movie" id="HM" fetchUrl={requests.fetchScienceFictionMovies}/>
      <Row title="Comedy Movie" id="CM" fetchUrl={requests.fetchComedyMovies}/>
      <Footer /> */}
    </div>
  );
}

export default App;
