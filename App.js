import React, { Component } from 'react';
import { Root } from './config/AppRouter';
import Home from  './screens/Home'
import SignUp from  './screens/SignUp'
import Login from  './screens/Login'
import Profile from  './screens/Profile'
import MoreOptions from  './screens/MoreOptions'
import CommentResponses from  './screens/CommentResponses'

import {applyMiddleware, createStore,combineReducers } from 'redux'
import { Provider } from 'react-redux'
import {initialState} from './config/normalizedData'
import {sondages,commentResponses,comments,users,currentUser} from './config/appReducers'


const appReducer = combineReducers({
  sondages,
  commentResponses,
  comments,
  users,
  currentUser
}); 

const store = createStore(appReducer,initialState);

//console.log(store.getState())

class App extends Component {
  render() {
   return (
    <Provider store={store}>
        <Root />
    </Provider>
         );
  }
}

export default App;