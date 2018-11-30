import { StationData as IStationData } from "./types"

export class StationData implements IStationData {
    price: { [petrolType: string]: number; };
    confirmedBy: { [petrolType: string]: string; };
    confirmedAt: { [petrolType: string]: Date; };

    constructor(stationData: IStationData) {
        this.price = stationData.price
        this.confirmedBy = stationData.confirmedBy
        this.confirmedAt = stationData.confirmedAt
    }
}