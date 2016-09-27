import Inferno from 'inferno';
import { render } from 'inferno-dom';
import { Provider } from 'inferno-redux';
import { Router, Route, browserHistory } from 'inferno-router';
import App from './containers/App';
import configureStore from './store/configureStore';

const store = configureStore();

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/:name' component={App} />
      <Route path='/' component={App} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
