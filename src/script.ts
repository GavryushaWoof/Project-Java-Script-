import * as invoice from './invoices.json';
import { Invoice } from './interfaces/Invoice';
import { Performance } from './interfaces/Performance';
import { getPlayStorages, getAmount, addText, getVolumeCredits, format } from './utils/utils';
import { Plays } from './interfaces/Plays';
import { FORMAT_DIVIDER } from './constants/constants';

function statement(invoice: Invoice, plays: Plays): string {
    try {
        let result = `Счет для ${invoice.customer}\n`;
        let totalAmount = 0;
        let volumeCredits = 0;
        for (let perf of invoice.performance) {
            const play = plays[perf.playId];
            let thisAmount = getAmount(play.type, perf.audience);
            result += addText(play.name, perf.audience, thisAmount);
            volumeCredits += getVolumeCredits(play.type, perf.audience);
            totalAmount += thisAmount;
        }
        result += `Итого с вас ${format(totalAmount / FORMAT_DIVIDER)}\n`;
        result += `Вы заработали ${volumeCredits} бонусов\n`;
        return result;
    } catch (error) {
        console.error(error);
    }
}

const result = statement(invoice as Invoice, getPlayStorages(invoice.performance as Performance[]));
console.log(result);