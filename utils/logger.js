//Import the Winston logging library used for recording messages.
import winston from 'winston';
//Create a logger instance that outputs messages to the console.
const logger = new (winston.createLogger)({
  //Transport defines where the log messages are sent (console in this case).
  transports: [new (winston.transports.Console)({ json: false })],
});
//Sets the default logging level to "debug".
logger.level = 'debug';
//If a logging level is defined in the environment variables, use that instead.
if (process.env.LEVEL) {
  logger.level = process.env.LEVEL;
}
//Export the logger so it can be used throughout the application.
export default logger;