export const loggedIn = (user) => ({ type: "LOGGED_IN_SUCCESS", user });
export const loggedOut = () => ({ type: "LOGGED_OUT_SUCCESS" });
export const loggingIn = () => ({ type: "LOGGING_IN_REQUEST" });
export const loggingOut = () => ({ type: "LOGGING_OUT_REQUEST" });
export const loggingInError = (response) => ({ type: "LOGGING_IN_FAILURE", response });
export const loggingOutError = (response) => ({ type: "LOGGING_OUT_FAILURE", response });
//# sourceMappingURL=actionCreators.js.map