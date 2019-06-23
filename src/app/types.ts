export type AppAction =
    | { type: "CLEAR_RESPONSE_SUCCESS" }
    | { type: "SET_LOCATION_SUCCESS" }
    | { type: "SET_LOCATION_FAILURE" }
    | { type: "SET_CURRENT_LOCATION_SUCCESS" }
    | { type: "SET_CURRENT_LOCATION_FAILURE" }
    | { type: "PROCESSING_START" }
    | { type: "PROCESSING_END" }

export interface Actions {
    signOut: boolean
}

export interface Response {
    title: string,
    message: string,
    actions?: Actions
}

export interface AppState {
    readonly processing: boolean,
    readonly response?: Response,
    readonly location?: Location,
    readonly currentLocation?: Location,
}

export interface Location {
    latitude: number,
    longitude: number,
}
