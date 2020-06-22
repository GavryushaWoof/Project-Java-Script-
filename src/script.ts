import * as invoice from './invoices.json';
import { Plays } from './interface/Plays';
import { PerformanceTypes } from './enum/PerformanceTypes';
import { Invoice } from './interface/Invoice';

const playsStorage: Plays = {
    "Гамлет": {
        name: "Гамлет",
        type: PerformanceTypes.TRAGEDY
    },
    "Ромео и Джульетта": {
        name: "Ромео и Джульетта",
        type: PerformanceTypes.TRAGEDY
    },
    "Отелло": {
        name: "Отелло",
        type: PerformanceTypes.COMEDY
    }
}
const format = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 2
}).format;
function statement(invoice: Invoice, plays: Plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Счет для ${invoice.customer}\n`;
    for (let perf of invoice.performance) {
        const play = plays[perf.playId];
        let thisAmount = 0;
        switch (play.type) {
            case PerformanceTypes.TRAGEDY:
                thisAmount = 40000;
                if (perf.audience > 30) {
                    thisAmount += 1000 * (perf.audience - 30);
                }
                break;
            case PerformanceTypes.COMEDY:
                thisAmount = 30000;
                if (perf.audience > 20) {
                    thisAmount += 10000 + 500 * (perf.audience - 20);
                }
                thisAmount += 300 * perf.audience;
                break;
            default:
                throw new Error(`Неизвестный тип: ${play.type}`);
        }
        volumeCredits += Math.max(perf.audience - 30, 0);
        if (PerformanceTypes.COMEDY === play.type) volumeCredits += Math.floor(perf.audience / 5);
        result += ` ${play.name}:${format(thisAmount / 100)}`;
        result += ` (${perf.audience} мест)\n`;
        totalAmount += thisAmount;
    }
    result += `Итого с вас ${format(totalAmount / 100)}\n`;
    result += `Вы заработали ${volumeCredits} бонусов\n`;
    return result;
}

let result = statement(invoice as Invoice, playsStorage);
console.log(result);