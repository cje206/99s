import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { configureStore } from '@reduxjs/toolkit';
// import { Provider } from 'react-redux';
// import { composeWithDevTools } from '@redux-devtools/extension';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// const store = configureStore({ reducer: rootReducer }, composeWithDevTools);

root.render(
  <React.StrictMode>
    {/* <Provider store ={store} > */}
    {/* 나중에 redux 써서 store쓰면 이 안에다가 App 넣으면 됌 */}
    {/* </Provider> */}
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
