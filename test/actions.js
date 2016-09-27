import test from 'ava';
import nock from 'nock';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import api from '../middleware/api';
import { fetchApiIfNeeded } from '../actions';
import { API_REQUEST, API_SUCCESS, API_FAILURE } from '../constants/ActionTypes';

const mockStore = configureStore([ thunk, api ]);

test.afterEach(() => {
  nock.cleanAll();
});

test('success fetch api', async t => {
  const store = mockStore({});

  nock('http://localhost:3000')
    .get('/api.json')
    .reply(200, {
      result: true
    });

  await store.dispatch(fetchApiIfNeeded());

  t.deepEqual(store.getActions(), [
    { type: API_REQUEST },
    { type: API_SUCCESS, response: { result: true } }
  ]);
});

test('failed fetch api', async t => {
  const store = mockStore({});

  nock('http://localhost:3000')
    .get('/api.json')
    .reply(200, {
      error: true
    });

  await store.dispatch(fetchApiIfNeeded());

  t.deepEqual(store.getActions(), [
    { type: API_REQUEST },
    { type: API_FAILURE, error: true }
  ]);
});
