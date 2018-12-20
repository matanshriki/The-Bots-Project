import React from 'react';
import ReactDOM from 'react-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from 'redux'
import reduxLogger from "redux-logger"
import { fetchRandomUser } from './components/Browse/browse.actions'
//async...
import ReduxThunk from 'redux-thunk'

import App from './components/App/App.view'
import rootReducer from './reducers/index'
import { Router } from 'react-router-dom'
import { isRegExp } from 'util';

import css from './static/css/globals.css'

// const myMiddleWare = store => next => action => {
//     next(action)
//     localStorage.setItem("data", JSON.stringify(store.getState()));
//     return
// }

// const checkIfDataExist = () => {
//     localStorage.getItem(JSON.parse(localStorage.getItem("data"))) || {}
// }


const middleware = applyMiddleware(reduxLogger, ReduxThunk)

const store = createStore(rootReducer, composeWithDevTools(middleware))

store.dispatch(fetchRandomUser());


const mainLoader = document.querySelector('.mainPreloader');
mainLoader.classList.remove(".mainPreloader");
mainLoader.style.display = 'none'; 

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.querySelector('.main'));

