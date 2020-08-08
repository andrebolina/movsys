import { FETCHING, SET_MOVIES, GET_MOVIE } from '../redux/constants';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

/*
  #Comment
  Método para obter lista de filmes com base nos filtros de pesquisa, como a descrição do cenário contempla a avaliação, que não é retornada nesta rota, é feito uma nova obtenção dos dados individuais de cada filme da lista retornada
*/
export function getMovieList(payload) {
  return (dispatch) => {
    dispatch({ type: FETCHING });
    return axios
      .get(
        `${API_URL}?apikey=${API_KEY}&s=${payload.title}&y=${payload.year}&type=movie`
      )
      .then(({ data }) => {
        if (data.Search) {
          const fullMovies = data.Search.map(async (item) => {
            item.title = item.Title;
            item.rating = await getMovieRating(item.imdbID);
            return item;
          });

          (async () => {
            const newMovies = await Promise.all(fullMovies);
            dispatch({ type: SET_MOVIES, payload: newMovies });
          })();
        } else {
          dispatch({ type: SET_MOVIES, payload: [] });
        }
      });
  };
}

/*
  #Comment
  Método para obter a avalição de determinado filme
*/
export async function getMovieRating(imdbId) {
  const result = await axios.get(
    `${API_URL}?apikey=${API_KEY}&i=${imdbId}&plot=full&r=json`
  );
  const movie = await result.data;
  return movie.imdbRating;
}

/*
  #Comment
  Método para obter todos os dados de determinado filme
*/
export function getMovieInfo(payload) {
  return (dispatch) => {
    dispatch({ type: FETCHING });
    return axios
      .get(`${API_URL}?apikey=${API_KEY}&i=${payload}&plot=full&r=json`)
      .then(({ data }) => {
        dispatch({ type: GET_MOVIE, payload: data });
      });
  };
}
