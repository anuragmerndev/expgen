import { Prisma } from '@prisma/client';

import client from '@db/index';

const createNewUser = async (data: Prisma.UserCreateInput) => {
    return await client.user.create({
        data,
    });
};

const getUserbyId = async (id: string) => {
    return await client.user.findUnique({
        where: {
            id,
        },
    });
};

const updateUser = async (id: string, data: Prisma.UserUpdateInput) => {
    return await client.user.update({
        where: {
            id,
        },
        data,
    });
};

const deleteUserbyID = async (id: string) => {
    return await client.user.delete({
        where: {
            id,
        },
    });
};

export { createNewUser, getUserbyId, updateUser, deleteUserbyID };
