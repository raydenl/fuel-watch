const initialState = {
    processing: true,
};
export const appReducer = (state = initialState, action) => {
    const { type } = action;
    console.log(type);
    const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);
    // not a *_REQUEST / *_SUCCESS /  *_FAILURE actions, so we ignore them
    if (!matches)
        return state;
    const [, , actionType] = matches;
    switch (actionType) {
        case "REQUEST":
            return Object.assign({}, state, { processing: true, response: undefined });
        case "FAILURE":
            return Object.assign({}, state, { processing: false, response: action.response });
        default:
            if (type === "SET_LOCATION_SUCCESS") {
                return Object.assign({}, state, { location: action.location });
            }
            if (type === "CLEAR_RESPONSE_SUCCESS") {
                return Object.assign({}, state, { response: undefined });
            }
            else {
                return Object.assign({}, state, { processing: false });
            }
    }
};
//# sourceMappingURL=reducer.js.map