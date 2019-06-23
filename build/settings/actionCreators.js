export const settingsLoaded = (settings) => ({ type: "SETTINGS_LOADING_SUCCESS", settings });
export const loadingSettings = () => ({ type: "SETTINGS_LOADING_REQUEST" });
export const loadingSettingsError = (response) => ({ type: "SETTINGS_LOADING_FAILURE", response });
export const settingsSaved = (settings) => ({ type: "SETTINGS_SAVING_SUCCESS", settings });
export const savingSettings = () => ({ type: "SETTINGS_SAVING_REQUEST" });
export const savingSettingsError = (response) => ({ type: "SETTINGS_SAVING_FAILURE", response });
//# sourceMappingURL=actionCreators.js.map