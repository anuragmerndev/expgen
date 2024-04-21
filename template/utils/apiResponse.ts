import { Response } from 'express';

import { RESPONSE_STATUS } from '@utils/responseStatus';

function apiResponse(res: Response, statusCode: RESPONSE_STATUS, data: any) {
    return res.status(statusCode).json(data);
}
export { apiResponse };
