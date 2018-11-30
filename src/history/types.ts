import { Response } from '../app/types'

export type HistoryAction =
    | { type: "HISTORY_SAVING_SUCCESS" }
    | { type: "HISTORY_SAVING_REQUEST" }
    | { type: "HISTORY_SAVING_FAILURE", response: Response }

export interface History {
    place_id: string,
    petrolType: string,
    price: number,
    confirmedAt: Date,
}