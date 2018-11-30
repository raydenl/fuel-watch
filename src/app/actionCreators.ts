import { ActionCreator } from 'redux'
import { AppAction } from './types'

export const clearResponse: ActionCreator<AppAction> = () => ({ type: "CLEAR_RESPONSE_SUCCESS" })

export const setLocation: ActionCreator<AppAction> = (location: Location) => ({ type: "SET_LOCATION_SUCCESS", location })

export const setLocationError: ActionCreator<AppAction> = (response: Response) => ({ type: "SET_LOCATION_FAILURE", response })