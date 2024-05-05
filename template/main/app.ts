import cors from 'cors';
import express from 'express';

import { errorHandler } from '@middlewares/globalErrorHandler';

import { apiRequestLogger } from '@logger/logger';

import { rootRouter } from '@routes/index';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRequestLogger);

app.get('/healthz', (req, res) => {
    return res.send('healthy');
});

app.use('/v1', rootRouter);

app.use(errorHandler);

export { app };
