import { createStore,combineReducers,applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {authenticationReducer} from './ducks/authentication'
import {userCollectionReducer} from './ducks/userCollection';
import {metedataReducer} from './ducks/metadata';

const middlewares=[
    logger,
    thunk,
]

const store=createStore(combineReducers({
    authentication:authenticationReducer,
    userCollection:userCollectionReducer,
    appMetadata:metedataReducer
}),composeWithDevTools(applyMiddleware(...middlewares)));

export default store
