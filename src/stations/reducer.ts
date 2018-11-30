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
        case "LOCATION_CHANGED_SUCCESS":
            return {
                ...state,
                location: action.location
            }
        default:
            return state;
    }
}