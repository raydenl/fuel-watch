const initialState = {
    stations: [],
};
export const stationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "STATIONS_LOADING_SUCCESS":
        case "STATIONS_DATA_LOADING_SUCCESS":
            return Object.assign({}, state, { stations: action.stations });
        case "LOCATION_CHANGED_SUCCESS":
            return Object.assign({}, state, { location: action.location });
        default:
            return state;
    }
};
//# sourceMappingURL=reducer.js.map