import {
    FETCHING, SET_MOVIES, GET_MOVIE
} from './constants';

const initialState = {
	movies: {},
	movie: {},
	isLoading: false
};

function rootReducer(state = initialState, action) {
  if (action.type === SET_MOVIES) {
  	return {
  		...state,
  		movies: action.payload, 
  		isLoading: false
  	};
  }

  if (action.type === GET_MOVIE) {
  	return {
  		...state,
  		movie: action.payload, 
  		isLoading: false
  	};
  }

  if (action.type === FETCHING) {
  	return {
  		...state,
  		isLoading: true
  	};
  }

  return state;
}
export default rootReducer;