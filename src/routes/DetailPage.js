import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'

function DetailPage() {
  const [movie, setMovie] = useState({})

  let {movieId} = useParams();
  console.log('movieId',movieId);
  console.log('useParams()',useParams());

  const fetchData = async() => {
    const request = await axios.get(`/movie/${movieId}`);
    console.log('request',request);
    setMovie(request.data);
  }

  useEffect(()=>{
    fetchData();
  })

  if(!movie) return <div>...loading</div>;
  return (
    <section>
        <img 
            className='model__poster-img'
            src={`http://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt="poster" />
    </section>
  )
}

export default DetailPage