var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as actionCreators from './actionCreators';
import Sentry from '../libraries/sentry';
import { database } from "../libraries/firebase";
import { Settings as SettingsEntity } from "./Settings";
export const loadSettings = (uid) => (dispatch) => new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
    dispatch(actionCreators.loadingSettings());
    try {
        const snapshot = yield database.ref('settings').child(uid).once('value');
        if (snapshot && snapshot.val() !== null) {
            const settings = snapshot.val();
            dispatch(actionCreators.settingsLoaded(settings));
            resolve(settings);
        }
        else {
            dispatch(actionCreators.settingsLoaded());
            resolve();
        }
    }
    catch (err) {
        dispatch(actionCreators.loadingSettingsError({ title: "Error", message: "An error occurred." }));
        Sentry.captureException(err);
        reject();
    }
}));
export const saveSettings = (uid, settings) => (dispatch) => new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
    dispatch(actionCreators.savingSettings());
    try {
        const userRef = database.ref('settings');
        yield userRef.child(uid).update(new SettingsEntity(settings));
        dispatch(actionCreators.settingsSaved());
        resolve();
    }
    catch (err) {
        dispatch(actionCreators.savingSettingsError({ title: "Error", message: "An error occurred." }));
        Sentry.captureException(err);
        reject();
    }
}));
//# sourceMappingURL=actions.js.map