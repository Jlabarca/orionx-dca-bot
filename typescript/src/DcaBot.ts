import { DcaBotConfig, Exchange, ExchangeType, Investment } from './DcaBotConfig'
import log from './logger';
import orionx from 'orionx-sdk'
import cron from 'cron'
import _ from 'lodash'

export class DcaBot {
    private exchanges: Map<string, Exchange> = new Map();

    constructor(config: DcaBotConfig) {
        log.info('DcaBot - initializing exchanges');

        config.exchanges.forEach(exchange => {
            this.initializeExchange(exchange);
        });
    private initializeExchange(exchange: Exchange) {
        log.debug(exchange.type as ExchangeType)

        switch (exchange.type as ExchangeType) {
            case ExchangeType.ORIONX:
                orionx.setCredentials(exchange)
                break;
            default:
                break;
        }

        this.exchanges.set(exchange.name, exchange);
    }

