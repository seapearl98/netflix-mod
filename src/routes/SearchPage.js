import axios from '../api/axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../styles/SearchPage.css';
import { useDebounce } from '../hooks/useDebounce';

function SearchPage() {
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  //console.log('useLacation()', useLocation());
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  const searchTerm = query.get("q");

    /* useDebounce hook함수를 거쳐 0.5초동안 searchTerm의 새로운 값이 없다면 새로 변수에 할당 */
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    /* q속성이 있을 경우에만 실행 */
    useEffect(() => {
      if (debouncedSearchTerm) {
        fetchSearchMovie(debouncedSearchTerm);
      }
    }, [debouncedSearchTerm]); // q속성이 변경 될 때마다 재렌더링



  const fetchSearchMovie = async(searchTerm) => {
    try {
      const request = await axios.get(
        `/search/multi?include_adult=false&query=${searchTerm}`);
        //console.log("request",request)
        setSearchResults(request.data.results);
    } catch (error) {
      console.log("error", error);
    }
  }

    const renderSearchResults = () => {
      return searchResults.length > 0 ? (
        debouncedSearchTerm ? (
        <section className='search_container'>
          {searchResults.map((movie) => {
            if(movie.backdrop_path !== null && movie.media_type !== "person"){
              const movieImageUrl = "https://image.tmdb.org/t/p/w500" + movie?.backdrop_path;
              return (
                <div className='movie' key={movie.id}>
                  <div
                    className='movie__column_poster'
                    onClick={() => { 
                      navigate(`/${movie.id}`)
                      }}>
                      <img 
                        className="movie__poster" 
                        src={movieImageUrl} 
                        alt={movie.title || movie.name || movie.original_name}/>
                    <div className='poster__detail'>
                      <h3 className='poster__detail-title'>{movie.title}</h3>
                      <p className='poster__detail-info'>클릭하여 상세페이지로 이동</p>
                    </div>
                  </div>
                </div>

              )
            }
          })}
        </section>
        ):(
          navigate('/')
        )
      ) : debouncedSearchTerm ? (
        <section className='no_results'>
          <div className='no_results__text'>
            <p>
              찾고자하는 검색어 "{searchTerm}"에 맞는 영화가 없습니다.
            </p>
          </div>
        </section>
      ):(
        navigate('/')
      )
    }


    return renderSearchResults();
}

export default SearchPage