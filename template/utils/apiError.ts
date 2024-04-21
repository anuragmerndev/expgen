export interface APIErrorType {
    statusCode: number;
    message: any;
}

class ApiError extends Error implements APIErrorType {
    statusCode: number;

    constructor(statusCode: number, message: any) {
        // Calling constructor of Error class
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }
}

export { ApiError };
