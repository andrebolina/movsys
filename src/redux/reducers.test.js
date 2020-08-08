import { FETCHING, SET_MOVIES, GET_MOVIE } from './constants';
import rootReducer from './reducers';

describe('Reducers test', () => {
  it('Should return default state', () => {
    const newState = rootReducer(undefined, {});
    const defaultState = {
      movies: {},
      movie: {},
      isLoading: false,
    };
    expect(newState).toEqual(defaultState);
  });

  it('Should return new state receiving FETCHING', () => {
    const newState = rootReducer(undefined, {
      type: FETCHING,
    });
    const expectedState = {
      movies: {},
      movie: {},
      isLoading: true,
    };
    expect(newState).toEqual(expectedState);
  });

  it('Should return new state receiving SET_MOVIES', () => {
    const newState = rootReducer(undefined, {
      type: SET_MOVIES,
      payload: 'test_payload',
    });
    const expectedState = {
      movies: 'test_payload',
      movie: {},
      isLoading: false,
    };
    expect(newState).toEqual(expectedState);
  });

  it('Should return new state receiving GET_MOVIE', () => {
    const newState = rootReducer(undefined, {
      type: GET_MOVIE,
      payload: 'test_payload',
    });
    const expectedState = {
      movies: {},
      movie: 'test_payload',
      isLoading: false,
    };
    expect(newState).toEqual(expectedState);
  });
});
