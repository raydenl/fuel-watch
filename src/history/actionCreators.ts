import { ActionCreator } from 'redux'
import { HistoryAction } from './types'
import { Response } from '../app/types'

export const historySaved: ActionCreator<HistoryAction> = () => ({ type: "HISTORY_SAVING_SUCCESS" })

export const savingHistory: ActionCreator<HistoryAction> = () => ({ type: "HISTORY_SAVING_REQUEST" })

export const savingHistoryError: ActionCreator<HistoryAction> = (response: Response) => ({ type: "HISTORY_SAVING_FAILURE", response })
