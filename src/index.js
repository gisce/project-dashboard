import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, Redirect, browserHistory} from 'react-router';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore';
import routes from './routes';

injectTapEventPlugin();
const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Redirect from="/" to="projects" />
            {routes}
        </Router>
    </Provider>,
    document.getElementById('root')
);