import { DcaBot } from './dcaBot'
import { ConfigLoader, DcaBotConfig } from './dcaBotConfig'
import { Command  } from 'commander'

const program = new Command();
program.version(process.env.npm_package_version);
program
  .option('-m, --manual <investment name>', 'Manual buy call of specific investment by name')
  .parse(process.argv);

const options = program.opts();

let config : DcaBotConfig = ConfigLoader.load();
let bot = new DcaBot(config);

if (options.manual === undefined) {
    bot.run();
} else {
    bot.manual(options.manual);
}
