import { combineReducers } from 'redux';

// reducers
import authentication from './authentication';
import netflix from './netflix';

const rootReducer = combineReducers({
  authentication,
  netflix,
});
export default rootReducer;
