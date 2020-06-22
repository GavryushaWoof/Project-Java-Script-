import * as invoice from './invoices.json';
import { Plays } from './interfaces/Plays';
import { PerformanceTypes } from './enums/PerformanceTypes';
import { Invoice } from './interfaces/Invoice';
import { Play } from './interfaces/Play';
import { Performance } from './interfaces/Performance';
import { statement } from './utils/utils';

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

let result = statement(invoice as Invoice, playsStorage);
console.log(result);