import { combineReducers } from 'redux';
import postReducer from './post';
//Combine reducers
const indexReducer = combineReducers({
  post: postReducer,
});

export default indexReducer;
