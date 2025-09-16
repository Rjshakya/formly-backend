import winston, { createLogger } from "winston";

let level = process.env.NODE_ENV === "development" ? "debug" : "info";

const logger = createLogger({
  level: level,
  transports: [
    new winston.transports.Console({
      level: level,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
        winston.format.prettyPrint(),
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${level} : ${timestamp} ${message}`;
        })
      ),
    }),
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
  ],
});


logger.stream = {
  // @ts-ignore
  write: (message: string) => {
    logger.info(message.trim());
  },
};

export default logger;
