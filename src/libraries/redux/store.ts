import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducer'
import { StoreState } from './types'

const initialState: StoreState = {
    auth: { authenticated: false },
    app: { processing: true },
    stations: { stations: [] },
    settings: { settings: undefined },
}

export default (state: StoreState = initialState) => {
    const enhancer = compose(applyMiddleware(thunk));

    const store = createStore(reducers, state, enhancer);

    return store;
}