import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import createStore from './reducks/store/store'
import {ConnectedRoter} from "connected-react-router";
import * as History from "history";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const history =History.createBrowserHistory();
export const store = createStore(history);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRoter history={history}>
     <App />
    </ConnectedRoter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
