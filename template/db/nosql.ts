import mongoose from 'mongoose';

async function dbConnection() {
    try {
        const { DATABASE_URL } = process.env;

        await mongoose
            .connect(DATABASE_URL!)
            .then(() => {
                console.log('database connected');
            })
            .catch((err: Error) => {
                console.error(err.message);
            });
    } catch (error: any) {
        console.error(error.message);
    }
}

export { dbConnection };