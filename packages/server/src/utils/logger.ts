import pino from 'pino';
import pinoPretty from 'pino-pretty';

const prettyStream = pinoPretty({
  translateTime: 'SYS:standard',
  colorize: true,
  ignore: 'pid,hostname',
});

const logger = pino(
  {
    level: 'info',
  },
  prettyStream,
);

export default logger;
