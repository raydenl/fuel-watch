import { Dispatch } from 'redux';
import { AppAction } from './types'
import * as actionCreators from './actionCreators'
import Expo, { Permissions } from 'expo'
import Sentry from '../libraries/sentry'
import { Settings } from '../settings/types';
import { config as googleConfig } from '../parties/google/config'
import { Location } from '../app/index'

//Clear an error message
export const clearResponse = () =>
    async (dispatch: Dispatch<AppAction>) => {
        dispatch(actionCreators.clearResponse())
    }

export const setLocation = (settings?: Settings) =>
    async (dispatch: Dispatch<AppAction>) =>
        new Promise<Location>(async (resolve, reject) => {
            try {
                if (!settings || settings.useLocation) {
                    const { status } = await Expo.Permissions.askAsync(Permissions.LOCATION)
                    if (status === "granted") {
                        const expoLocation = await Expo.Location.getCurrentPositionAsync({ enableHighAccuracy: false })
                        const location: Location = { longitude: expoLocation.coords.longitude, latitude: expoLocation.coords.latitude }
                        dispatch(actionCreators.setLocation(location))
                        resolve(location)
                    } else {
                        dispatch(actionCreators.setLocationError({ title: "Location", message: "You will need to setup a postcode under the Settings menu." }))
                        reject()
                    }
                } else {
                    const uri = `https://maps.googleapis.com/maps/api/geocode/json?address=${settings.postcode},+New+Zealand&key=${googleConfig.apiKey}`
                    const response = await fetch(uri)

                    const json = await response.json()

                    if (json.status === "OK") {
                        const geoLocation = json.results[0]['geometry'].location
                        const location: Location = { longitude: geoLocation.lng, latitude: geoLocation.lat }
                        dispatch(actionCreators.setLocation(location))
                        resolve(location)
                    } else if (json.status === "ZERO_RESULTS") {
                        dispatch(actionCreators.setLocationError({ title: "Error", message: "Invalid location. Check the postcode you have entered under the Settings menu." }))
                        reject()
                    } else {
                        dispatch(actionCreators.setLocationError({ title: "Error", message: "An error occurred." }))
                        Sentry.captureException(new Error(`${json.status}: ${json.error_message || "<no error_message field>"}`));
                        reject()
                    }
                }
            } catch (err) {
                dispatch(actionCreators.setLocationError({ title: "Error", message: "An error occurred." }))
                Sentry.captureException(err);
                reject()
            }
        })