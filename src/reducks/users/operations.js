import {signInAction} from "./actions";
import {push} from 'connected-react-router';

export const signIn = () => {
    return async (dispatch, getState) => {
        const state = getState()  //メソッドを呼び出す際はカッコが必要
        const IsSignedIn = state.users.IsSignedIn //store   isSignedInのデータを取得している

        if (!IsSignedIn) {
            const url ='https://api.github.com/users/kinoshitaken123'

            const response = await fetch(url)
                                 .then(res => res.json())
                                 .catch(() => null)
            const username = response.login
            
            dispatch(signInAction({
                IsSignedIn: true,
                uid: "00001",
                username: username
            }))
            dispatch(push('/'))
        }
    }
}