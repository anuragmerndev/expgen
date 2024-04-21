import { UserModel } from '@models/user.models';

import { User } from '@projTypes/user.types';

const createNewUser = async (data: User) => {
    return await UserModel.create(data);
};

const getUserbyId = async (id: string) => {
    return await UserModel.findById(id);
};

const updateUser = async (id: string, data: Partial<User>) => {
    return await UserModel.findByIdAndUpdate(id, data);
};

const deleteUserbyID = async (id: string) => {
    return await UserModel.findByIdAndDelete(id);
};

export { createNewUser, getUserbyId, updateUser, deleteUserbyID };
