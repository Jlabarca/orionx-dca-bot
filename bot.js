import orionx from 'orionx-sdk'
import cron from 'cron'

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
		var CronJob = cron.CronJob;
		var job = new CronJob(cronTime, function() {
			console.log('You will see this message every second');
		}, null, true, 'America/Los_Angeles');
		job.start();
	}
}