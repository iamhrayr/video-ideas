import {combineReducers} from 'redux';
import auth from './auth';
import ideas from './ideas';
import idea from './idea';
import personalIdeas from './personalIdeas';
import flashMessages from './flashMessages';

export default combineReducers({
    auth,
    ideas,
    idea,
    personalIdeas,
    flashMessages
});