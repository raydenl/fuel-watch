import { Reducer } from 'redux'
import { StationsAction, StationsState, StationWithData } from './types'

const initialState: StationsState = {
    stations: [],
}

export const stationsReducer: Reducer<StationsState> = (state: StationsState = initialState, action: StationsAction) => {
    switch (action.type) {
        case "STATIONS_LOADING_SUCCESS":
        case "STATIONS_DATA_LOADING_SUCCESS":
            return {
                ...state,
                stations: action.stations as StationWithData[]
            }
        case "STATION_DATA_SAVING_SUCCESS":
            return {
                ...state,
                stations: state.stations.map(station =>
                    station.place_id === action.station.place_id ? action.station : station
                )
            }
        default:
            return state;
    }
}