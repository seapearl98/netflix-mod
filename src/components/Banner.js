import axios from '../api/axios';
import React, { useEffect, useState } from 'react'
import requests from '../api/request';
import '../styles/Banner.css'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import MovieModal from './MovieModal';

function Banner() {

const [movie, setMovie] = useState([]); //영화정보가져오는 함수
const [modalOpen, setModalOpen] = useState(false);
const [isClicked, setIsClicked] = useState(false); //클릭했을때 함수
const [movieSelected, setMovieSelected] = useState({});
const navigate = useNavigate();

useEffect(()=> {
    fetchData();
},[]); //componentdidmount시점이랑 동일. 처음랜더링되고나서 실행되는 함수. 이때 api를 다 가져옴

const fetchData = async () => {
    //상영중인 영화 정보 가져오기(20개)
    const request = await axios.get(requests.fetchNowPlaying);
    // console.log(request);

    //20개의 영화 중 하나의 id 가져오기
    const movieId = request.data.results[
        Math.floor(Math.random() * request.data.results.length + 0)
    ].id;

    //특정 영화의 상세정보 가져오기(videos비디오정보 포함)
    const {data:movieDetail} = await axios.get(`movie/${movieId}`,{
        params:{append_to_response:"videos"}, //videos라는 속성까지 포함해서 가져오겠다
    });
    // console.log(movieDetail)
    setMovie(movieDetail) //setMovie에 저장
};

const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  };

    const truncate = (str,n) =>{
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    };

    if(!isClicked){
  return (
    <header className='banner' 
    style={{
        backgroundImage:`url("http://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition:"top center",
        backgroundSize:"cover",
    }}>
        
        <div className='banner__contents'>
            <h1 className='banner__title'>
                {movie.title || movie.name || movie.original_name}
            </h1>
            <div className='banner__buttons'>
                <button className='banner__button play' 
                onClick={()=>setIsClicked(true)}>play</button>
                <button className='banner__button info' onClick={() => handleClick(movie)}>More Information</button>
            </div>
            <p className='banner__description'>{
                movie.overview ?
                truncate(movie.overview, 200)
                :
                '등록 된 정보가 없습니다.'
            }</p>
        </div>
        <div className='banner__fadeBottom'></div>
        {modalOpen && <MovieModal {...movieSelected} setModalOpen={setModalOpen} />}
    </header>
        
  )}else{
    return(
        <Container>
            <HomeContainer>
                {movie.videos.results[0] ? (
                    <>
                        <Iframe
                        src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?showinfo=0&rel=0&modestbranding=0&controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
                        allowTransparency='true'
                        title='YouTube video player'></Iframe>
                        <div className='close_video'>
                            <span onClick={() => setIsClicked(false)}>Close X</span>
                        </div>
                    </>
                ) : (
                    <div className='close_video'>
                        <span onClick={() => setIsClicked(false)}>Close X</span>
                        <div className='videoNone'>등록된 영상이 없습니다.</div>
                    </div> 
                )}    
            </HomeContainer>
        </Container>
    );
  }
}

const Container = styled.div`
    display: flex;
    flex-direction: column; justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
`;
const HomeContainer = styled.div`
    width:100%;
    height: 100%;
`
const Iframe = styled.iframe`
width: 100%;
height: 100%; z-index: -1;
opacity: 0.65; border: none;
&::after{ content: "";
position: absolute;
top: 0; left: 0;
width: 100%;
height: 100%;
}
`;
export default Banner