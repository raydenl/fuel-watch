const initialState = {
    settings: undefined
};
export const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SETTINGS_LOADING_SUCCESS":
            return Object.assign({}, state, { settings: action.settings });
        default:
            return state;
    }
};
//# sourceMappingURL=reducer.js.map