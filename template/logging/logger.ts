import { Request, Response, NextFunction } from 'express';
import { format, createLogger, transports } from 'winston';

const { combine, label, timestamp, printf } = format;

const timestampFormat = 'MMM-DD-YYYY HH:mm:ss';

const appLogFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp}  [${label}] ${level}: ${message}`;
});

const logger = createLogger({
    format: combine(
        label({ label: 'genxp' }),
        timestamp({ format: timestampFormat }),
        appLogFormat,
    ),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: 'logs/error.log',
            level: 'error',
        }),
        new transports.File({
            filename: 'logs/combined.log',
        }),
    ],
});

const apiRequestLogger = (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();

    // Log details about incoming request
    logger.info(`Request received - Method: ${req.method}, URL: ${req.url}`);

    // Capture the end of the request/response lifecycle
    res.on('finish', () => {
        const duration = Date.now() - start;

        // Log details about response
        logger.info(
            `Response sent - Status: ${res.statusCode}, Duration: ${duration}ms`,
        );
    });

    next();
};

export { logger, apiRequestLogger };
