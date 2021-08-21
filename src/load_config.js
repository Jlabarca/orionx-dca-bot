import nconf from 'nconf'

nconf.argv()
   .file({
		file: 'config.json'
	});

nconf.set('exchange:type', 'orionx');
nconf.set('exchange:apiKey', '');
nconf.set('exchange:secretKey', '');
nconf.set('exchange:apiUri', 'https://api2.orionx.com/graphql');

nconf.set('investment:cron', '0 0 0 * * *');
nconf.set('investment:market', 'BTCCLP');
nconf.set('investment:amount', '');

nconf.save();
const appName = 'dca-bot';
const dateFormat = 'DD-MM-YYYY HH:mm:ss';
const logLevel = nconf.get('log_level');

export default {appName, dateFormat, logLevel}