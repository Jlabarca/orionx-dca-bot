import {default as configFile} from "../config.json";

export enum ExchangeType { ORIONX = 'ORIONX' }

export interface DcaBotConfig {
    app_name:    string;
    log_level:   string;
    date_format: string;
    exchanges:   Exchange[];
    investments: Investment[];
}

export interface Exchange {
    name:      string;
    type:      string;
    apiKey:    string;
    secretKey: string;
    apiUri:    string;
}

export interface Investment {
    name:      string;
    exchange: string;
    cron:     string;
    market:   string;
    amount:   number;
}


export class ConfigLoader {
    static load(): DcaBotConfig {
        return configFile;
    }
}