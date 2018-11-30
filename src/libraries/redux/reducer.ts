import { combineReducers } from 'redux';
import { authReducer } from '../../auth';
import { appReducer } from '../../app/index';
import { stationsReducer } from '../../stations';
import { StoreState } from './types'
import { settingsReducer } from '../../settings';

export default combineReducers<StoreState>({
    auth: authReducer,
    app: appReducer,
    stations: stationsReducer,
    settings: settingsReducer,
});