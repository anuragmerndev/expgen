import rateLimit from 'express-rate-limit';

import { ApiError } from '@utils/apiError';
import { RESPONSE_STATUS } from '@utils/responseStatus';
import { responseMessage } from '@utils/responseMessage';

/**
 * Default rate limiter for general API endpoints
 * Limits each IP to 100 requests per 15 minutes
 */
export const defaultRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
        success: false,
        message: responseMessage.OTHER.TOO_MANY_REQUESTS,
        statusCode: RESPONSE_STATUS.TOO_MANY_REQUEST,
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    handler: (req, res, next, options) => {
        throw new ApiError(
            RESPONSE_STATUS.TOO_MANY_REQUEST,
            responseMessage.OTHER.TOO_MANY_REQUESTS
        );
    },
});

/**
 * Strict rate limiter for sensitive endpoints (auth, login, etc.)
 * Limits each IP to 10 requests per 15 minutes
 */
export const strictRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 requests per windowMs
    message: {
        success: false,
        message: responseMessage.OTHER.TOO_MANY_REQUESTS,
        statusCode: RESPONSE_STATUS.TOO_MANY_REQUEST,
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next, options) => {
        throw new ApiError(
            RESPONSE_STATUS.TOO_MANY_REQUEST,
            responseMessage.OTHER.TOO_MANY_REQUESTS
        );
    },
});

/**
 * Relaxed rate limiter for public endpoints
 * Limits each IP to 500 requests per 15 minutes
 */
export const relaxedRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 500, // Limit each IP to 500 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
});
