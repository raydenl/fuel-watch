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
import { History as HistoryEntity } from './History';
export const saveHistory = (history) => (dispatch) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        dispatch(actionCreators.savingHistory());
        try {
            const userRef = database.ref('history');
            yield userRef.update(new HistoryEntity(history));
            dispatch(actionCreators.historySaved());
            resolve();
        }
        catch (err) {
            dispatch(actionCreators.savingHistoryError({ title: "Error", message: "An error occurred." }));
            Sentry.captureException(err);
            reject();
        }
    }));
});
//# sourceMappingURL=actions.js.map