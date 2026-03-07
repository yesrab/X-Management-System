import pino from 'pino';

const logger =
  process.env.NODE_ENV === 'development'
    ? pino(
        {
          name: 'X-Management-System',
          level: 'debug',
        },
        pino.transport({
          target: 'pino-pretty',
          options: {
            levelFirst: true,
            colorize: true,
            ignore: 'time,hostname,pid',
          },
        }),
      )
    : pino({
        name: 'X-Management-System',
        level: 'info',
      });

export default logger;
