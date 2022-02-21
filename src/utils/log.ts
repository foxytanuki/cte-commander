import { createLogger, format, transports } from 'winston';

const level = process.env?.NODE_ENV === 'development' ? 'debug' : 'info';

const log = createLogger({
  format: format.combine(
    format.colorize(),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.printf(
      (info) =>
        `${info.timestamp} ${info.level}: ${info.message}` +
        (info.splat !== undefined ? `${info.splat}` : ' ')
    )
  ),
  transports: [new transports.Console({ level })],
});

export { log };
