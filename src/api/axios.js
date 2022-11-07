import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: process.env.REACT_APP_MOVIE_DB_API_KEY,
        language: "ko-KR"
    }
})

export default instance; //매번 이걸 다 쓰기 힘드니 instance라는 변수로 저장해 쓰겠다