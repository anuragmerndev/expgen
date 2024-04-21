import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        min: 1,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        min: 6,
        max: 10,
    },
});

const UserModel = model('user', userSchema);

export { UserModel };
