import fetch from 'isomorphic-fetch';

function callApi() {
  return fetch('http://localhost:3000/api.json')
    .then(response => response.json())
    .then(response => {
      const { error } = response;
      if (error) return Promise.reject(error);
      return { ...response };
    });
}

export const CALL_API = 'CALL_API';

export default () => next => action => {
  const callApiOptions = action[CALL_API];

  if (typeof callApiOptions === 'undefined') {
    return next(action);
  }

  const { types } = callApiOptions;
  const [ requestType, successType, failureType ] = types;

  function actionWith(data) {
    const finalAction = { ...action, ...data };
    delete finalAction[CALL_API];
    return finalAction;
  }

  next(actionWith({ type: requestType }));

  return callApi()
    .then(response => next(actionWith({
      type: successType,
      response
    })))
    .catch(error => next(actionWith({
      type: failureType,
      error
    })));
};
