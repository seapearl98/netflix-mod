import React from 'react'
import requests from '../api/request'
import Banner from '../components/Banner'
import Row from '../components/Row'

function MainPage() {
  return (
    <div>
      <Banner/>
      <Row title="NETFLIX ORIGINALS" id="NO" fetchUrl={requests.fetchNetflixOriginals} isLargeRow/>
      <Row title="Trending Now" id="TN" fetchUrl={requests.fetchTrending}/>
      <Row title="Top Rated" id="TR" fetchUrl={requests.fetchTopRated}/>
      <Row title="Action Movie" id="AM" fetchUrl={requests.fetchActionMovies}/>
      <Row title="Documentaries" id="DM" fetchUrl={requests.fetchDocumentaries} />
      <Row title="Romance Movie" id="RM" fetchUrl={requests.fetchRomanceMovies}/>
      <Row title="Science Fiction Movie" id="HM" fetchUrl={requests.fetchScienceFictionMovies}/>
      <Row title="Comedy Movie" id="CM" fetchUrl={requests.fetchComedyMovies}/>
    </div>
  )
}

export default MainPage