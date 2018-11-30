import { ActionCreator } from 'redux'
import { AuthAction, User } from './types'
import { Response } from '../app/types'

export const loggedIn: ActionCreator<AuthAction> = (user: User) => ({ type: "LOGGED_IN_SUCCESS", user })

export const loggedOut: ActionCreator<AuthAction> = () => ({ type: "LOGGED_OUT_SUCCESS" })

export const loggingIn: ActionCreator<AuthAction> = () => ({ type: "LOGGING_IN_REQUEST" })

export const loggingOut: ActionCreator<AuthAction> = () => ({ type: "LOGGING_OUT_REQUEST" })

export const loggingInError: ActionCreator<AuthAction> = (response: Response) => ({ type: "LOGGING_IN_FAILURE", response })

export const loggingOutError: ActionCreator<AuthAction> = (response: Response) => ({ type: "LOGGING_OUT_FAILURE", response })