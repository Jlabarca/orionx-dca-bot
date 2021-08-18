import orionx from 'orionx-sdk'
import cron from 'cron'
import nconf from 'nconf'
import winston from 'winston'

nconf.argv()
   .env()
   .file({
		file: 'config.json'
	});

const log = winston.createLogger({
  level: nconf.get('log_level'),
  format: winston.format.combine(
	winston.format.colorize(),
	winston.format.splat(),
	winston.format.timestamp(),
	winston.format.printf(info => `${info.timestamp.replace('T', ' ').replace('Z', '')}[${info.level}]: ${info.message };`)
  ),
  defaultMeta: { service: 'orionx-dca-bot' },
  transports: [
	new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
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
		log.debug('Initializing cron schedule');
		var CronJob = cron.CronJob;
		var job = new CronJob(cronTime, function() {
			log.info('You will see this message every second');
		});
		job.start();
	}
}