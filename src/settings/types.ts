import { Response } from '../app/types'

export type SettingsAction =
    | { type: "SETTINGS_LOADING_SUCCESS", settings: Settings }
    | { type: "SETTINGS_LOADING_REQUEST" }
    | { type: "SETTINGS_LOADING_FAILURE", response: Response }
    | { type: "SETTINGS_SAVING_SUCCESS" }
    | { type: "SETTINGS_SAVING_REQUEST" }
    | { type: "SETTINGS_SAVING_FAILURE", response: Response }

export interface SettingsState {
    readonly settings?: Settings,
}

export interface Settings {
    postcode?: string,
    useLocation: boolean,
    radius?: number,
    name?: string,
}

export interface RadiusSettings {
    step: number,
    min: number,
    max: number,
}