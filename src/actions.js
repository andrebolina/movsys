import {
    API_URL, API_KEY, API_KEY_QUERY_STRING,
    START_FETCHING, SET_MOVIE_LIST, SET_MOVIE_DETAIL
} from './constants';

export function getMovieList(payload) {
	return dispatch => {
		dispatch({ type: START_FETCHING });
        return fetch(`${ API_URL }?${ API_KEY_QUERY_STRING }=${ API_KEY }&s=${ payload.q }&y=${payload.y}`)
            .then(result=>result.json())
            .then(items=> {
                if (items.Search) {
                    const novosItems = items.Search.map(async item => {
                        item.title = item.Title;
                        item.rating = await getMovieRating(item.imdbID);
                        return item;
                    });

                    (async () => {
                        const allItems = await Promise.all(novosItems);
                        dispatch({ type: SET_MOVIE_LIST, payload: allItems });
                    })();
                } else {
                    dispatch({ type: SET_MOVIE_LIST, payload: [] });
                }
            });
  };
};

export async function getMovieRating(imdbId) {
    const res = await fetch(`${ API_URL }?${ API_KEY_QUERY_STRING }=${ API_KEY }&i=${ imdbId }&plot=full&r=json`);
    const data = await res.json();
    return data.imdbRating;
};

export function getMovieDetail(payload) {
	return dispatch => {
		dispatch({ type: START_FETCHING });
        return fetch(`${ API_URL }?${ API_KEY_QUERY_STRING }=${ API_KEY }&i=${ payload }&plot=full&r=json`) 
            .then(result=>result.json())
            .then(item=> {
            	dispatch({ type: SET_MOVIE_DETAIL, payload: item });
            });
  };
};