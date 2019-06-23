import { Settings as ISettings } from "./types"

export class Settings implements ISettings {
    postcode?: string | undefined; useLocation: boolean;
    radius?: number | undefined;
    name?: string | undefined;
    petrolType?: string | undefined;

    constructor(settings: ISettings) {
        this.postcode = settings.postcode
        this.radius = settings.radius
        this.name = settings.name
        this.useLocation = settings.useLocation
        this.petrolType = settings.petrolType
    }
}