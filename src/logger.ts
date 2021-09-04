import winston from 'winston'
import moment from 'moment'
import 'winston-daily-rotate-file';
import {default as configFile} from "../config.json";

const log = winston.createLogger({
    level: configFile.log_level,
    exitOnError: false,
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.printf(info => `${moment(info.timestamp).format(configFile.date_format)} [${info.level}]: ${info.message }`)
    ),
    defaultMeta: { service: configFile.app_name },
    transports: [
      new(winston.transports.DailyRotateFile)({
          filename: configFile.app_name,
          dirname: './logs',
          datePattern: 'DD-MMM-YYYY',
         // timestamp: moment().format,
          maxSize: '20m',
          maxFiles: '7d',
          level: configFile.log_level,
            format: winston.format.combine(winston.format.uncolorize())
      }),
      new(winston.transports.Console)({
          //colorize: true,
          //timestamp: moment().format
      })
    ],
  });

  export default log;