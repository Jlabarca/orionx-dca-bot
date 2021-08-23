import { DcaBot } from './DcaBot'
import { ConfigLoader, DcaBotConfig } from './DcaBotConfig'

let config : DcaBotConfig = ConfigLoader.load();
let bot = new DcaBot(config);