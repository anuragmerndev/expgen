import { Router } from 'express';

import { userRouter } from '@routes/user.routes';

const rootRouter = Router();

rootRouter.use('/user', userRouter);

export { rootRouter };
