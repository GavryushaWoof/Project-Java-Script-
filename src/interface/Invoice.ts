import { Performance } from "./Performance";

export interface Invoice {
    customer: string;
    performance: Performance[];
}