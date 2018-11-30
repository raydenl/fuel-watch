import { Reducer } from 'redux'
import { SettingsAction, SettingsState } from './types'

const initialState: SettingsState = {
    settings: undefined
}

export const settingsReducer: Reducer<SettingsState> = (state: SettingsState = initialState, action: SettingsAction) => {
    switch (action.type) {
        case "SETTINGS_LOADING_SUCCESS":
            return {
                ...state,
                settings: action.settings
            }
        default:
            return state;
    }
}