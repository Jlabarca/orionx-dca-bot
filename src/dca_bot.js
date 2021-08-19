import orionx from 'orionx-sdk'
import cron from 'cron'
import winston from 'winston'
import moment from 'moment'
import 'winston-daily-rotate-file';
import * as config from './load_config.js';


const log = winston.createLogger({
  level: config.logLevel,
  exitOnError: false,
  format: winston.format.combine(
	winston.format.colorize(),
	winston.format.printf(info => `${moment(info.timestamp).format(config.dateFormat)} [${info.level}]: ${info.message }`)
  ),
  defaultMeta: { service: appName },
  transports: [
	new(winston.transports.DailyRotateFile)({
		filename: appName,
		dirname: './logs',
		datePattern: 'DD-MMM-YYYY',
		timestamp: moment().format,
		maxSize: '20m',
    	maxFiles: '7d',
		level: config.logLevel,
      	format: winston.format.combine(winston.format.uncolorize())
	}),
	new(winston.transports.Console)({
		colorize: true,
		timestamp: moment().format
	})
  ],
});

export default {
	orionx,
	setCredentials(apiKey, secretKey, apiUri = 'https://api2.orionx.com/graphql') {
		orionx.setCredentials({
			apiKey,
			secretKey,
			apiUri,
		  })		  
	},
	cronSchedule(cronTime) {
		log.debug('Initializing cron scheduled buy');
		var CronJob = cron.CronJob;
		var job = new CronJob(cronTime, function() {
			log.info('You will see this message every second');
		});
		job.start();
	}
}