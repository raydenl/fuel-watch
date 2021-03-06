import { Settings, RadiusSettings } from "./types";

export const settingsDefaults: Settings = {
    postcode: "",
    useLocation: true,
    radius: 1500,
    name: "",
    petrolType: "91",
}

export const radiusSettings: RadiusSettings = {
    step: 500,
    min: 500,
    max: 10000
}