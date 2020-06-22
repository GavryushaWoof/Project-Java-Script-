import { PerformanceTypes } from "../enum/PerformanceTypes";

export interface Performance {
    playId: string;
    audience: number;
    type: PerformanceTypes;
}