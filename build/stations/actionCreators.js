export const stationsLoaded = (stations) => ({ type: "STATIONS_LOADING_SUCCESS", stations });
export const loadingStations = () => ({ type: "STATIONS_LOADING_REQUEST" });
export const loadingStationsError = (response) => ({ type: "STATIONS_LOADING_FAILURE", response });
export const stationsDataLoaded = (stations) => ({ type: "STATIONS_DATA_LOADING_SUCCESS", stations });
export const loadingStationsData = () => ({ type: "STATIONS_DATA_LOADING_REQUEST" });
export const loadingStationsDataError = (response) => ({ type: "STATIONS_DATA_LOADING_FAILURE", response });
export const stationDataSaved = () => ({ type: "STATION_DATA_SAVING_SUCCESS" });
export const savingStationData = () => ({ type: "STATION_DATA_SAVING_REQUEST" });
export const savingStationDataError = (response) => ({ type: "STATION_DATA_SAVING_FAILURE", response });
export const locationChanged = (location) => ({ type: "LOCATION_CHANGED_SUCCESS", location });
//# sourceMappingURL=actionCreators.js.map