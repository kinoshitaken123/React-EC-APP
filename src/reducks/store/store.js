import{
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware　//redux package
} from "redux";

import {routerMiddleware, connectRouter} from 'connected-react-router';
import {UsersReducer} from '../users/reducers';

//history 今どのパスいるかを表す
export default function createStore (history) { 
    return reduxCreateStore(
        combineReducers({
            router: connectRouter(history),
            users: UsersReducer
        }),
        applyMiddleware(
            routerMiddleware(history)
        )
    );
}