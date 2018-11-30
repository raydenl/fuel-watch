const initialState = {
    authenticated: false,
};
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGGED_IN_SUCCESS":
            return Object.assign({}, state, { authenticated: !!action.user, user: action.user });
        case "LOGGED_OUT_SUCCESS":
            return initialState;
        default:
            return state;
    }
};
//# sourceMappingURL=reducer.js.map