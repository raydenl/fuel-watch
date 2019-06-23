var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as actionCreators from './actionCreators';
import Expo, { Permissions } from 'expo';
import Sentry from '../libraries/sentry';
import { config as googleConfig } from '../parties/google/config';
import { debounce } from 'debounce';
//Clear an error message
export const clearResponse = () => (dispatch) => __awaiter(this, void 0, void 0, function* () {
    dispatch(actionCreators.clearResponse());
});
export const setCurrentLocation = () => (dispatch) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { status } = yield Expo.Permissions.askAsync(Permissions.LOCATION);
            if (status === "granted") {
                const expoLocation = yield Expo.Location.getCurrentPositionAsync({ enableHighAccuracy: false });
                const location = { longitude: expoLocation.coords.longitude, latitude: expoLocation.coords.latitude };
                dispatch(actionCreators.setCurrentLocation(location));
                resolve(location);
            }
            else {
                dispatch(actionCreators.setCurrentLocationError({ title: "Location", message: "Current position access denied. Some location features will be unavailable." }));
                reject();
            }
        }
        catch (err) {
            dispatch(actionCreators.setCurrentLocationError({ title: "Error", message: "An error occurred." }));
            Sentry.captureException(err);
            reject();
        }
    }));
});
export const setLocation = (settings) => (dispatch) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const uri = `https://maps.googleapis.com/maps/api/geocode/json?address=${settings.postcode},+New+Zealand&key=${googleConfig.apiKey}`;
            const response = yield fetch(uri);
            const json = yield response.json();
            if (json.status === "OK") {
                const geoLocation = json.results[0]['geometry'].location;
                const location = { longitude: geoLocation.lng, latitude: geoLocation.lat };
                dispatch(actionCreators.setLocation(location));
                resolve(location);
            }
            else if (json.status === "ZERO_RESULTS") {
                dispatch(actionCreators.setLocationError({ title: "Error", message: "Invalid location. Check the postcode you have entered in the settings." }));
                reject();
            }
            else {
                dispatch(actionCreators.setLocationError({ title: "Error", message: "An error occurred." }));
                Sentry.captureException(new Error(`${json.status}: ${json.error_message || "<no error_message field>"}`));
                reject();
            }
        }
        catch (err) {
            dispatch(actionCreators.setLocationError({ title: "Error", message: "An error occurred." }));
            Sentry.captureException(err);
            reject();
        }
    }));
});
const debouncedLocationChange = (geoLocation) => (dispatch) => {
    const location = { longitude: geoLocation.coords.longitude, latitude: geoLocation.coords.latitude };
    return debounce(() => dispatch(actionCreators.setCurrentLocation(location)), 100);
};
export const startLocationListener = () => (dispatch) => __awaiter(this, void 0, void 0, function* () {
    return Expo.Location.watchPositionAsync({ distanceInterval: 500, timeInterval: 5 * 60 * 1000, enableHighAccuracy: false }, (location) => debouncedLocationChange(location)(dispatch));
});
//# sourceMappingURL=actions.js.map