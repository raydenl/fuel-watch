import { Reducer } from 'redux';
import { AppState } from './types'

const initialState: AppState = {
    processing: true,
}

export const appReducer: Reducer<AppState> = (state: AppState = initialState, action: any) => {
    const { type } = action;

    console.log(type)


    const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);

    // not a *_REQUEST / *_SUCCESS /  *_FAILURE actions, so we ignore them
    if (!matches) return state;

    const [, , actionType] = matches;

    switch (actionType) {
        case "REQUEST":
            return {
                ...state,
                processing: true,
                response: undefined,
            }
        case "FAILURE":
            return {
                ...state,
                processing: false,
                response: action.response,
            }
        default:
            if (type === "SET_LOCATION_SUCCESS") {
                return {
                    ...state,
                    location: action.location,
                }
            } if (type === "CLEAR_RESPONSE_SUCCESS") {
                return {
                    ...state,
                    response: undefined,
                }
            } else {
                return {
                    ...state,
                    processing: false,
                };
            }
    }
}