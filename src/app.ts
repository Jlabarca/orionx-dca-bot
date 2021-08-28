import { DcaBot } from './dcaBot'
import { ConfigLoader, DcaBotConfig } from './dcaBotConfig'

let config : DcaBotConfig = ConfigLoader.load();
let bot = new DcaBot(config);