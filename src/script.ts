import * as invoice from './invoices.json';
import { Invoice } from './interfaces/Invoice';
import { Performance } from './interfaces/Performance';
import { statement, getPlayStorages } from './utils/utils';

const result = statement(invoice as Invoice, getPlayStorages(invoice.performance as Performance[]));
console.log(result);