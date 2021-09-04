import { DcaBotConfig, Exchange, ExchangeType, Investment } from './dcaBotConfig'
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

        config.investments.forEach(investment => {
            this.cronSchedule(investment)
        });
    }

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

	private cronSchedule(investment: Investment) {
		log.debug(`Initializing Investment ${investment.amount} ${investment.market} on ${investment.exchange} at ${investment.cron}`);
		var CronJob = cron.CronJob;
		var job = new CronJob(investment.cron, () => {
			this.executePurchase(investment);
		});
		job.start();
	}

    private async executePurchase(investment: Investment) {
        //get exchange
        let exchange: Exchange = this.exchanges.get(investment.exchange);
        if(_.isNil(exchange)) {
            log.error(`Exchange ${investment.exchange} not found`);
            return;
        }

        
        switch (exchange.type as ExchangeType) {
            case ExchangeType.ORIONX:
                if (this.checkCurrencyBalance(investment)) {
                    this.executeOrionxPurchase(investment);
                }
                break;
            default:
                break;
        }
    }

    private async checkCurrencyBalance(investment: Investment): Promise<boolean> {
        const currency = investment.market.substr(3, 3);
        let wallet = await orionx.wallet({currencyCode: currency});
        log.info(`${currency} available balance ${wallet.availableBalance}`)

        if (wallet.availableBalance < investment.amount) {
            log.warn('Not enough currency balance');
            return false;
        }

        return true;
    }

    private async executeOrionxPurchase(investment: Investment) {
        log.info(`Executing market purchase of ${investment.amount} ${investment.market}`)
        let order = await orionx.placeMarketOrder(({marketCode: investment.market, amount: investment.amount, sell: false}));
        log.info(JSON.stringify(order));
    }
}