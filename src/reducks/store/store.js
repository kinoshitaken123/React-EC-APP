import{
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware　//redux package
} from "redux";

import {routerMiddleware, connectRouter} from 'connected-react-router';
import {ProductsReducer} from '../products/reducers';
import {UsersReducer} from '../users/reducers';
import thunk from 'redux-thunk';

//history 今どのパスいるかを表す
export default function createStore (history) { 
    // const logger = createLogger({
    //     collapsed: true,
    //     diff: true
    // });

    return reduxCreateStore(
        combineReducers({
            products: ProductsReducer,
            router: connectRouter(history),
            users: UsersReducer
        }),
        applyMiddleware(
            routerMiddleware(history),
            thunk
        )
    );
}