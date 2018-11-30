import { combineReducers } from 'redux';
import { authReducer } from '../../auth';
import { appReducer } from '../../app/index';
import { stationsReducer } from '../../stations';
import { settingsReducer } from '../../settings';
export default combineReducers({
    auth: authReducer,
    app: appReducer,
    stations: stationsReducer,
    settings: settingsReducer,
});
//# sourceMappingURL=reducer.js.map