import { Plays } from "../interfaces/Plays";
import { PerformanceTypes } from "../enums/PerformanceTypes";
import { Performance } from '../interfaces/Performance';
import { MINIMUM_FRACTION_DIGITS, TRAGEDY_AMOUNT, TRAGEDY_LIMIT, TRAGEDY_LIMIT_MULTIPLIER, COMEDY_AMOUNT, COMEDY_LIMIT, COMEDY_LIMIT_ADDEND, COMEDY_LIMIT_MULTIPLIER, COMEDY_MULTIPLIER, VOLUME_CREDITS_SUBTRAHEND, VOLUME_CREDITS_DIVIDER, FORMAT_DIVIDER } from "../constants/constants";

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
    minimumFractionDigits: MINIMUM_FRACTION_DIGITS
}).format;

export function getAmount(type: PerformanceTypes, audience: number): number {
    let thisAmount = 0;
    switch (type) {
        case PerformanceTypes.TRAGEDY:
            thisAmount = TRAGEDY_AMOUNT;
            if (audience > TRAGEDY_LIMIT) {
                thisAmount += TRAGEDY_LIMIT_MULTIPLIER * (audience - TRAGEDY_LIMIT);
            }
            return thisAmount;
        case PerformanceTypes.COMEDY:
            thisAmount = COMEDY_AMOUNT;
            if (audience > COMEDY_LIMIT) {
                thisAmount += COMEDY_LIMIT_ADDEND + COMEDY_LIMIT_MULTIPLIER * (audience - COMEDY_LIMIT);
            }
            thisAmount += COMEDY_MULTIPLIER * audience;
            return thisAmount;
        default:
            throw new Error(`Неизвестный тип: ${type}`);
    }
}

export function getVolumeCredits(type: PerformanceTypes, audience: number): number {
    let volumeCredits = Math.max(audience - VOLUME_CREDITS_SUBTRAHEND, 0);
    if (PerformanceTypes.COMEDY === type) volumeCredits += Math.floor(audience / VOLUME_CREDITS_DIVIDER);
    return volumeCredits;
}

export function addText(name: string, audience: number, thisAmount: number): string {
    let result = "";
    result += ` ${name}: ${format(thisAmount / FORMAT_DIVIDER)}`;
    result += ` (${audience} мест)\n`;
    return result;
}
