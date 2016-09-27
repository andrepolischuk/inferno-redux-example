import { API_REQUEST, API_SUCCESS, API_FAILURE } from '../constants/ActionTypes';

export default function api(state = { isFetching: false, result: null }, action) {
  switch (action.type) {
    case API_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case API_SUCCESS:
      return {
        ...state,
        isFetching: false,
        result: action.result
      };
    case API_FAILURE:
      return {
        ...state,
        isFetching: false,
        result: null
      };
    default:
      return state;
  }
}
