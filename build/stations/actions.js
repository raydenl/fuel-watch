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
import { config as googleConfig } from '../parties/google/config';
import { database } from "../libraries/firebase";
import { StationData as StationDataEntity } from './StationData';
export const loadStations = (location, radius) => (dispatch) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        dispatch(actionCreators.loadingStations());
        try {
            const uri = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.latitude},${location.longitude}&radius=${radius}&type=gas_station&key=${googleConfig.apiKey}`;
            const response = yield fetch(uri);
            const json = yield response.json();
            if (json.status === "OK" || json.status === "ZERO_RESULTS") {
                const stations = json.results;
                dispatch(actionCreators.stationsLoaded(stations));
                resolve(stations);
            }
            else {
                dispatch(actionCreators.loadingStationsError({ title: "Error", message: "An error occurred." }));
                Sentry.captureException(new Error(`${json.status}: ${json.error_message || "<no error_message field>"}`));
                reject();
            }
        }
        catch (err) {
            dispatch(actionCreators.loadingStationsError({ title: "Error", message: "An error occurred." }));
            Sentry.captureException(err);
            reject();
        }
    }));
});
export const loadStationsData = (stations) => (dispatch) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        dispatch(actionCreators.loadingStationsData());
        try {
            const promises = stations.map((station) => {
                return database.ref('stations').child(station.place_id).once('value');
            });
            const stationsData = stations;
            const snapshots = yield Promise.all(promises);
            snapshots.forEach(function (snapshot) {
                if (snapshot.val() !== null) {
                    const placeId = snapshot.key;
                    const data = snapshot.val();
                    const station = stationsData.filter(station => station.place_id === placeId)[0];
                    Object.assign(station, data);
                }
            });
            if (stationsData.length) {
                dispatch(actionCreators.stationsDataLoaded(stationsData));
                resolve(stationsData);
            }
            else {
                dispatch(actionCreators.stationsDataLoaded());
                resolve();
            }
        }
        catch (err) {
            dispatch(actionCreators.loadingStationsDataError({ title: "Error", message: "An error occurred." }));
            Sentry.captureException(err);
            reject();
        }
    }));
});
export const saveStationData = (station) => (dispatch) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        dispatch(actionCreators.savingStationData());
        try {
            const userRef = database.ref('stations');
            yield userRef.child(station.place_id).update(new StationDataEntity(station));
            dispatch(actionCreators.stationDataSaved(station));
            resolve();
        }
        catch (err) {
            dispatch(actionCreators.savingStationDataError({ title: "Error", message: "An error occurred." }));
            Sentry.captureException(err);
            reject();
        }
    }));
});
//# sourceMappingURL=actions.js.map