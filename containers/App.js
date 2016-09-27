import Inferno from 'inferno';
import Component from 'inferno-component';
import { connect } from 'inferno-redux';
import { fetchApiIfNeeded } from '../actions';
import styles from './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleFetchClick = this.handleFetchClick.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchApiIfNeeded());
  }

  handleFetchClick(event) {
    event.preventDefault();
    this.props.dispatch(fetchApiIfNeeded());
  }

  render() {
    const { isFetching, result, name = 'world' } = this.props;

    return (
      <div className={isFetching ? styles.fetching : styles.normal}>
        {!result && isFetching
          ? <h3>Loading...</h3>
          : <h3>Hello {name}!</h3>
        }
        {!isFetching &&
          <a href='#' onClick={this.handleFetchClick}>
            Fetch
          </a>
        }
      </div>
    );
  }
}

function mapStateToProps({ api }, ownProps) {
  const { result, isFetching } = api || {
    result: false,
    isFetching: false
  };

  return {
    result,
    isFetching,
    name: ownProps.params.name
  };
}

export default connect(mapStateToProps)(App);
