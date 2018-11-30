import { Reducer } from 'redux'
import { AuthAction, AuthState } from './types'

const initialState: AuthState = {
    authenticated: false,
}

export const authReducer: Reducer<AuthState> = (state: AuthState = initialState, action: AuthAction) => {
    switch (action.type) {
        case "LOGGED_IN_SUCCESS":
            return {
                ...state,
                authenticated: !!action.user,
                user: action.user,
            };
        case "LOGGED_OUT_SUCCESS":
            return initialState;
        default:
            return state;
    }
}