import { ActionCreator } from 'redux'
import { StationsAction, Station, StationWithData } from './types'
import { Response, Location } from '../app/types'

export const stationsLoaded: ActionCreator<StationsAction> = (stations: Station[]) => ({ type: "STATIONS_LOADING_SUCCESS", stations })

export const loadingStations: ActionCreator<StationsAction> = () => ({ type: "STATIONS_LOADING_REQUEST" })

export const loadingStationsError: ActionCreator<StationsAction> = (response: Response) => ({ type: "STATIONS_LOADING_FAILURE", response })

export const stationsDataLoaded: ActionCreator<StationsAction> = (stations: StationWithData[]) => ({ type: "STATIONS_DATA_LOADING_SUCCESS", stations })

export const loadingStationsData: ActionCreator<StationsAction> = () => ({ type: "STATIONS_DATA_LOADING_REQUEST" })

export const loadingStationsDataError: ActionCreator<StationsAction> = (response: Response) => ({ type: "STATIONS_DATA_LOADING_FAILURE", response })

export const stationDataSaved: ActionCreator<StationsAction> = () => ({ type: "STATION_DATA_SAVING_SUCCESS" })

export const savingStationData: ActionCreator<StationsAction> = () => ({ type: "STATION_DATA_SAVING_REQUEST" })

export const savingStationDataError: ActionCreator<StationsAction> = (response: Response) => ({ type: "STATION_DATA_SAVING_FAILURE", response })

export const locationChanged: ActionCreator<StationsAction> = (location: Location) => ({ type: "LOCATION_CHANGED_SUCCESS", location })