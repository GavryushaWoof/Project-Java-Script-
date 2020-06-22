import { PerformanceTypes } from "../enums/PerformanceTypes";

export interface Performance {
    playId: string;
    audience: number;
    type: PerformanceTypes;
}