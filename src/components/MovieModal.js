import React from 'react'
import { useRef } from 'react'
import useOnClickOutside from '../hooks/useOnClickOutside';
import '../styles/MovieModal.css'

export default function MovieModal({backdrop_path,title,overview,name,release_date,vote_average,first_air_date,setModalOpen}) {
    const ref = useRef();

    useOnClickOutside(ref, ()=> {setModalOpen(false);})
  return (
    <div className='presentation'>
        <div className='wrapper-modal'>
            <div className='modal' ref={ref}>
                <span 
                className='modal-close' 
                onClick={() => {
                setModalOpen(false)}}>
                    X
                </span>
                <img className='modal__poster-img' alt={`${title ? title : name}`}
                src={`http://image.tmdb.org/t/p/original/${backdrop_path}`}/>
                <div className='modal__content'>
                    <p className='modal__details'>
                        <span className='modal__user_perc'>100% for you</span>{release_date}
                    </p>
                    <h2 className='modal__title'>{title? title : name}</h2>
                    <p className='modal__details'>평점: {vote_average}</p>
                    <p className='modal__overview'>{overview}</p>
                </div>
            </div>
        </div>
    </div>
  )
}
