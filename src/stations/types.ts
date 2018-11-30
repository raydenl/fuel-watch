import { Response, Location } from '../app/types'

export type StationsAction =
    | { type: "STATIONS_LOADING_SUCCESS", stations: Station[] }
    | { type: "STATIONS_LOADING_REQUEST" }
    | { type: "STATIONS_LOADING_FAILURE", response: Response }
    | { type: "STATIONS_DATA_LOADING_SUCCESS", stations: StationWithData[] }
    | { type: "STATIONS_DATA_LOADING_REQUEST" }
    | { type: "STATIONS_DATA_LOADING_FAILURE", response: Response }
    | { type: "STATION_DATA_SAVING_SUCCESS" }
    | { type: "STATION_DATA_SAVING_REQUEST" }
    | { type: "STATION_DATA_SAVING_FAILURE", response: Response }
    | { type: "LOCATION_CHANGED_SUCCESS", location: Location }

export interface StationsState {
    readonly stations: StationWithData[],
    readonly location?: Location,
}

export interface Station {
    place_id: string,
    name: string,
    vicinity: string,
}

export interface StationData {
    price: { [petrolType: string]: number },
    confirmedBy: { [petrolType: string]: string },
    confirmedAt: { [petrolType: string]: Date },
}

export interface StationWithData extends Station, StationData {
}

export interface StationCard {
    petrolType: string,
    station: StationWithData,
}