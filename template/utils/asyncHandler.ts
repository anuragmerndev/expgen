import { Request, Response, NextFunction } from 'express';

import { logger } from '../logging/logger';

function asyncHandler(
    handler: (req: Request, res: Response, next: NextFunction) => void,
) {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(handler(req, res, next)).catch((error: Error) => {
            logger.error(error.message);
            next(error);
        });
    };
}

export { asyncHandler };
