import { Plays } from "../interfaces/Plays";
import { PerformanceTypes } from "../enums/PerformanceTypes";
import { Performance } from '../interfaces/Performance';

export function getPlayStorages(play: Performance[]): Plays {
    const result = play.reduce((acc: Plays, cur) => {
        acc[cur.playId] = { name: cur.playId, type: cur.type };
        return acc;
    }, {});
    return result
}

export const format = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 2
}).format;

export function getAmount(type: PerformanceTypes, audience: number): number {
    let thisAmount = 0;
    switch (type) {
        case PerformanceTypes.TRAGEDY:
            thisAmount = 40000;
            if (audience > 30) {
                thisAmount += 1000 * (audience - 30);
            }
            return thisAmount;
        case PerformanceTypes.COMEDY:
            thisAmount = 30000;
            if (audience > 20) {
                thisAmount += 10000 + 500 * (audience - 20);
            }
            thisAmount += 300 * audience;
            return thisAmount;
        default:
            throw new Error(`Неизвестный тип: ${type}`);
    }
}

export function getVolumeCredits(type: PerformanceTypes, audience: number): number {
    let volumeCredits = Math.max(audience - 30, 0);
    if (PerformanceTypes.COMEDY === type) volumeCredits += Math.floor(audience / 5);
    return volumeCredits
}

export function addText(name: string, audience: number, thisAmount: number): string {
    let result = "";
    result += ` ${name}: ${format(thisAmount / 100)}`;
    result += ` (${audience} мест)\n`;
    return result;
}
