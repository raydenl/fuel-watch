import { Dispatch } from 'redux';
import { History, HistoryAction } from "./types";
import * as actionCreators from './actionCreators'
import Sentry from '../libraries/sentry'
import { database } from "../libraries/firebase"
import { History as HistoryEntity } from './History';

export const saveHistory = (history: History) =>
    async (dispatch: Dispatch<HistoryAction>) =>
        new Promise<void>(async (resolve, reject) => {
            dispatch(actionCreators.savingHistory())
            try {
                const userRef = database.ref('history')

                await userRef.update(new HistoryEntity(history))
                dispatch(actionCreators.historySaved())
                resolve()
            }
            catch (err) {
                dispatch(actionCreators.savingHistoryError({ title: "Error", message: "An error occurred." }))
                Sentry.captureException(err);
                reject()
            }
        })