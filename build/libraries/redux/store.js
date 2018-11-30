import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducer';
const initialState = {
    auth: { authenticated: false },
    app: { processing: true },
    stations: { stations: [] },
    settings: { settings: undefined },
};
export default (state = initialState) => {
    const enhancer = compose(applyMiddleware(thunk));
    const store = createStore(reducers, state, enhancer);
    return store;
};
//# sourceMappingURL=store.js.map