const errorResponse = {
    USER: {
        NOT_FOUND: 'User not found',
        CREATION_FAILED: 'Failed to create user',
        UPDATE_FAILED: 'Failed to update user',
        DELETION_FAILED: 'Failed to delete user',
    },

    EMAIL: {
        CONFLICT:
            'This email address is already associated with an existing account',
        REQUIRED: 'Email is required',
        INVALID: 'Invalid Email',
    },

    PASSWORD: {
        REQUIRED: 'Password is required',
        LENGTH: 'Password must be between 8 to 16 characters',
        INVALID_CREDENTIALS: 'Invalid credential',
        INVALID: 'Invalid Password',
    },
};

export { errorResponse };
