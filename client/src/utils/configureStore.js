import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';

const initialState = {
    auth: {
        isAuthenticated: !!localStorage.token,
        user: {}
    }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = composeEnhancers(
    applyMiddleware(thunk)
);

const store = createStore(
    reducer,
    initialState,
    enhancers
);

export default store;