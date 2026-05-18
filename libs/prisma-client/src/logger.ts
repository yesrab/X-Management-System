import pino from 'pino';

export function createLogger(appName: string) {
  return process.env.NODE_ENV === 'development'
    ? pino(
        {
          name: appName,
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
        name: appName,
        level: 'info',
      });
}
