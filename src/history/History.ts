import { History as IHistory } from "./types"

export class History implements IHistory {
    place_id: string;
    petrolType: string;
    price: number;
    confirmedAt: Date;

    constructor(history: IHistory) {
        this.place_id = history.place_id
        this.petrolType = history.petrolType
        this.price = history.price
        this.confirmedAt = history.confirmedAt
    }
}