import { Convert } from "./convert.model";

export class RouteData {
    
        ChartData? :any
        form?: {
            from: string,
            to: string,
            amount: number
        };
    
        result?: Convert
        symbolName?: string
    }
    
