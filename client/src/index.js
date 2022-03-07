import React from "react";
import ReactDOM from "react-dom";
import thunk from 'redux-thunk'
import { createStore, compose, applyMiddleware } from 'redux'; 
import { rootReducer } from './reducers/rootReducer';
import { Provider } from 'react-redux';
import App from './components/app/App';


import './index.css';

const store = createStore(rootReducer, compose(
  applyMiddleware(
    thunk
  ), 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}> 
          <App />
      </Provider>
  </React.StrictMode>,   
  document.getElementById("root") 
);
