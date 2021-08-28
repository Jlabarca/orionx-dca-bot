import nconf from 'nconf'
import {default as configFile} from "../../config.json";
import log from './logger';

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
    exchange: string;
    cron:     string;
    market:   string;
    amount:   number;
}


export class ConfigLoader {

    appName: string = 'dca-bot';
    dateFormat = 'DD-MM-YYYY HH:mm:ss';

    constructor() {
    }

    static load(): DcaBotConfig {
        log.info('load');
        return configFile;
    }
}