import { Dispatch } from 'redux';
import { SettingsAction, Settings } from './types'
import * as actionCreators from './actionCreators'
import Sentry from '../libraries/sentry'
import { database } from "../libraries/firebase"
import { Settings as SettingsEntity } from "./Settings"

export const loadSettings = (uid: string) =>
    (dispatch: Dispatch<SettingsAction>) =>
        new Promise<Settings | undefined>(async (resolve, reject) => {
            dispatch(actionCreators.loadingSettings())
            try {
                const snapshot = await database.ref('settings').child(uid).once('value')
                if (snapshot && snapshot.val() !== null) {
                    const settings = snapshot.val() as Settings
                    dispatch(actionCreators.settingsLoaded(settings))
                    resolve(settings)
                } else {
                    dispatch(actionCreators.settingsLoaded())
                    resolve()
                }
            } catch (err) {
                dispatch(actionCreators.loadingSettingsError({ title: "Error", message: "An error occurred." }))
                Sentry.captureException(err);
                reject()
            }
        })

export const saveSettings = (uid: string, settings: Settings) =>
    (dispatch: Dispatch<SettingsAction>) =>
        new Promise<void>(async (resolve, reject) => {
            dispatch(actionCreators.savingSettings())
            try {
                const userRef = database.ref('settings')

                await userRef.child(uid).update(new SettingsEntity(settings))
                dispatch(actionCreators.settingsSaved())
                resolve()
            }
            catch (err) {
                dispatch(actionCreators.savingSettingsError({ title: "Error", message: "An error occurred." }))
                Sentry.captureException(err);
                reject()
            }
        })
