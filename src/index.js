import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { createStore, compose } from 'redux';
import rootReducer from './reducers/index';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider, firebaseReducer } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import firebase from "./firebase";
import 'firebase/auth';

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
}
const initialState = {}
const store = createStore(rootReducer, initialState);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
}

//store.subscribe(() => console.log(store.getState()));

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister();
