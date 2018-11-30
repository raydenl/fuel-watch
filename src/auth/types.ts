import { Response } from '../app/types'

export type AuthAction =
    | { type: "LOGGED_IN_SUCCESS", user: User }
    | { type: "LOGGED_OUT_SUCCESS" }
    | { type: "LOGGING_IN_REQUEST" }
    | { type: "LOGGING_OUT_REQUEST" }
    | { type: "LOGGING_IN_FAILURE", response: Response }
    | { type: "LOGGING_OUT_FAILURE", response: Response }

export interface AuthState {
    readonly authenticated: boolean,
    readonly user?: User,
}

export interface User {
    displayName?: string;
    email?: string;
    uid: string;
}