import { ActionCreator } from 'redux'
import { SettingsAction, Settings } from './types'
import { Response } from '../app/types'

export const settingsLoaded: ActionCreator<SettingsAction> = (settings: Settings) => ({ type: "SETTINGS_LOADING_SUCCESS", settings })

export const loadingSettings: ActionCreator<SettingsAction> = () => ({ type: "SETTINGS_LOADING_REQUEST" })

export const loadingSettingsError: ActionCreator<SettingsAction> = (response: Response) => ({ type: "SETTINGS_LOADING_FAILURE", response })

export const settingsSaved: ActionCreator<SettingsAction> = () => ({ type: "SETTINGS_SAVING_SUCCESS" })

export const savingSettings: ActionCreator<SettingsAction> = () => ({ type: "SETTINGS_SAVING_REQUEST" })

export const savingSettingsError: ActionCreator<SettingsAction> = (response: Response) => ({ type: "SETTINGS_SAVING_FAILURE", response })

