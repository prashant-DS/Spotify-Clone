import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import { Provider as ReduxProvider } from 'react-redux';
import store from './state';

import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <App/>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
