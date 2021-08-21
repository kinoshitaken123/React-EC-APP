import{
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware　//redux package
} from "redux";
import {UsersReducer, roterMiddleware, connectRouter} from "connected-react-router";

export default function createStore (history) {  //history 今どのパスいるかを表す
    return reduxCreateStore(
        combineReducers({
            router: connectRouter(history),
            users: UsersReducer
        }),
        applyMiddleware(
            roterMiddleware(history)
        )
    );
}