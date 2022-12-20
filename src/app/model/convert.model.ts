export class Convert {
    
        success?: boolean;
        query?: {
            from: string,
            to: string,
            amount: number
        };
        info?: {
            timestamp: number;
            rate: number;
        };
        date!: Date;
        result?: number
    }
    
