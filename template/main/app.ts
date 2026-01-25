import cors from 'cors';
import express from 'express';

import { errorHandler } from '@middlewares/globalErrorHandler';
import { defaultRateLimiter } from '@middlewares/rateLimiter';
import { securityMiddleware } from '@middlewares/security';

import { apiRequestLogger } from '@logger/logger';

import { rootRouter } from '@routes/index';

const app = express();

// Security middleware (helmet)
app.use(securityMiddleware);

// CORS
app.use(cors());

// Rate limiting
app.use(defaultRateLimiter);

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use(apiRequestLogger);

// Health check endpoint
app.get('/healthz', (req, res) => {
    return res.send('healthy');
});

// API routes
app.use('/v1', rootRouter);

// Error handling
app.use(errorHandler);

export { app };
