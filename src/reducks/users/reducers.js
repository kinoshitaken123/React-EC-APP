import * as Actions from './actions'
import initialState from '../store/initialState'

export const UsersReducer = (state = initialState.users, action) => {
    swith (action.type) 
    switch (action.type) {
        case Actions.SIGN_IN:
            return {
                ...state,  //スプレッド構文
                ...action.payload
            }
            default:
                return state
    }
};