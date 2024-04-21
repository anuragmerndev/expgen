import { Router } from 'express';

import {
    createUser,
    getUser,
    updateUserData,
    deleteUser,
} from '@controllers/user.controllers';

const userRouter = Router();

userRouter.post('/', createUser);
userRouter.get('/:id', getUser);
userRouter.put('/:id', updateUserData);
userRouter.delete('/:id', deleteUser);

export { userRouter };
