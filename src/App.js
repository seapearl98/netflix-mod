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

const Layout =() => {
  return(
    <div>
      <Nav/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout/>}>
        <Route index element={<MainPage/>}/>
        <Route path="movieId" element={<DetailPage/>}/>
        <Route path="search" element={<SearchPage/>}/>
      </Route>  
      </Routes>
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
