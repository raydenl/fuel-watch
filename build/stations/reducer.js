const initialState = {
    stations: [],
};
export const stationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "STATIONS_LOADING_SUCCESS":
        case "STATIONS_DATA_LOADING_SUCCESS":
            return Object.assign({}, state, { stations: action.stations });
        case "STATION_DATA_SAVING_SUCCESS":
            return Object.assign({}, state, { stations: state.stations.map(station => station.place_id === action.station.place_id ? action.station : station) });
        default:
            return state;
    }
};
//# sourceMappingURL=reducer.js.map