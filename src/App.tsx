import React from 'react';
import './App.css';
import {Provider} from "react-redux";
import Board from "./components/Board";
import {createStore} from "redux";
import appReducer from "./store/appReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import {getInitialState} from "./store/state";

const store = createStore(appReducer, getInitialState(), composeWithDevTools());

function App() {
  return (
    <Provider store={store}>
      <Board/>
    </Provider>
  );
}

export default App;
