import { Dispatch } from 'redux';
import { StationsAction, Station, StationWithData, StationData } from './types'
import { Location } from '../app/types'
import * as actionCreators from './actionCreators'
import Sentry from '../libraries/sentry'
import Expo from 'expo'
import { config as googleConfig } from '../parties/google/config'
import { debounce } from 'debounce'
import { database } from "../libraries/firebase"
import { StationData as StationDataEntity } from './StationData';

export const loadStations = (location: Location, radius: number) =>
    async (dispatch: Dispatch<StationsAction>) =>
        new Promise<Station[]>(async (resolve, reject) => {
            dispatch(actionCreators.loadingStations())
            try {
                const uri = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.latitude},${location.longitude}&radius=${radius}&type=gas_station&key=${googleConfig.apiKey}`
                const response = await fetch(uri)

                const json = await response.json()

                if (json.status === "OK" || json.status === "ZERO_RESULTS") {
                    const stations = json.results as Station[]
                    dispatch(actionCreators.stationsLoaded(stations))
                    resolve(stations)
                } else {
                    dispatch(actionCreators.loadingStationsError({ title: "Error", message: "An error occurred." }))
                    Sentry.captureException(new Error(`${json.status}: ${json.error_message || "<no error_message field>"}`));
                    reject()
                }
            } catch (err) {
                dispatch(actionCreators.loadingStationsError({ title: "Error", message: "An error occurred." }))
                Sentry.captureException(err);
                reject()
            }
        })

export const loadStationsData = (stations: Station[]) =>
    async (dispatch: Dispatch<StationsAction>) =>
        new Promise<StationWithData[] | undefined>(async (resolve, reject) => {
            dispatch(actionCreators.loadingStationsData())
            try {
                const promises = stations.map((station) => {
                    return database.ref('stations').child(station.place_id).once('value')
                })
                const stationsData = stations as StationWithData[]
                const snapshots = await Promise.all(promises)
                snapshots.forEach(function (snapshot) {
                    if (snapshot.val() !== null) {
                        const placeId = snapshot.key
                        const data = snapshot.val() as StationWithData
                        const station = stationsData.filter(station => station.place_id === placeId)[0]
                        Object.assign(station, data)
                    }
                });

                if (stationsData.length) {
                    dispatch(actionCreators.stationsDataLoaded(stationsData))
                    resolve(stationsData)
                } else {
                    dispatch(actionCreators.stationsDataLoaded())
                    resolve()
                }
            } catch (err) {
                dispatch(actionCreators.loadingStationsDataError({ title: "Error", message: "An error occurred." }))
                Sentry.captureException(err);
                reject()
            }
        })

export const saveStationData = (station: StationWithData) =>
    async (dispatch: Dispatch<StationsAction>) =>
        new Promise<void>(async (resolve, reject) => {
            dispatch(actionCreators.savingStationData())
            try {
                const userRef = database.ref('stations')

                await userRef.child(station.place_id).update(new StationDataEntity(station as StationData))
                dispatch(actionCreators.stationDataSaved())
                resolve()
            }
            catch (err) {
                dispatch(actionCreators.savingStationDataError({ title: "Error", message: "An error occurred." }))
                Sentry.captureException(err);
                reject()
            }
        })

const debouncedLocationChange = (location: Expo.Location.LocationData) => (dispatch: Dispatch<StationsAction>) => {
    return debounce(() => dispatch(actionCreators.locationChanged({ longitude: location.coords.longitude, latitude: location.coords.latitude })), 100)
}

export const startLocationListener = () =>
    async (dispatch: Dispatch<StationsAction>) =>
        Expo.Location.watchPositionAsync({ distanceInterval: 500, timeInterval: 5 * 60 * 1000, enableHighAccuracy: false },
            location => debouncedLocationChange(location)(dispatch))