import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import Root from './components/root';
import store from './store';

ReactDOM.render(
    <Provider store={ store }>
        <Root />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
