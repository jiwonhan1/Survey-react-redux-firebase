import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
})

export default rootReducer;