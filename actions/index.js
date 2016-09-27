import { CALL_API } from '../middleware/api';
import { API_REQUEST, API_SUCCESS, API_FAILURE } from '../constants/ActionTypes';

function fetchApi() {
  return {
    [CALL_API]: {
      types: [ API_REQUEST, API_SUCCESS, API_FAILURE ]
    }
  };
}

function shouldFetchApi(state) {
  return !state.isFetching;
}

export function fetchApiIfNeeded() {
  return (dispatch, getState) =>
    shouldFetchApi(getState()) && dispatch(fetchApi());
}
