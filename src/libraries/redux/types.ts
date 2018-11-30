import { AuthState } from '../../auth'
import { AppState } from '../../app/index'
import { StationsState } from '../../stations'
import { SettingsState } from '../../settings';

export interface StoreState {
    auth: AuthState,
    app: AppState,
    stations: StationsState,
    settings: SettingsState,
}