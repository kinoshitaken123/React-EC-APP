import{
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware　//redux package
} from "redux";

import {routerMiddleware, connectRouter} from 'connected-react-router';
import {ProductReducer} from '../products/reducers';
import {UsersReducer} from '../users/reducers';
import thunk from 'redux-thunk';

//history 今どのパスいるかを表す
export default function createStore (history) { 
    return reduxCreateStore(
        combineReducers({
            products: ProductReducer,
            router: connectRouter(history),
            users: UsersReducer
        }),
        applyMiddleware(
            routerMiddleware(history),
            thunk
        )
    );
}