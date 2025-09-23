import winston, { createLogger } from "winston";
let level = process.env.NODE_ENV === "development" ? "debug" : "info";
const logger = createLogger({
  level,
  transports: [
    new winston.transports.Console({
      level,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
        winston.format.prettyPrint(),
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.printf(({ timestamp, level: level2, message }) => {
          return `${level2} : ${timestamp} ${message}`;
        })
      )
    })
    // new winston.transports.File({
    //   filename: "./logs/info.log",
    //   level: "info",
    //   format: winston.format.combine(
    //     winston.format.timestamp(),
    //     winston.format.json()
    //   ),
    //   maxsize: 10,
    // }),
    // new winston.transports.File({
    //   filename: "./logs/combined.log",
    //   format: winston.format.combine(
    //     winston.format.timestamp(),
    //     winston.format.json()
    //   ),
    //   maxsize: 10,
    // }),
  ]
});
logger.stream = {
  // @ts-ignore
  write: (message) => {
    logger.info(message.trim());
  }
};
var logger_default = logger;
export {
  logger_default as default
};
