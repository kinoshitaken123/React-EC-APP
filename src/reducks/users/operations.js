import {SignINAction} from "./actions";
import {push} from 'connected-react-router';

export const signIn = () => {
    return async (dispatch, getState) => {
        const state = getState()  //メソッドを呼び出す際はカッコが必要
        const IsSignedIn = state.users.IsSignedIn
    }
}