import { Request, Response, Router } from 'express';
import processing from '../components/imageProc';
import utils, { processReturn, queryParams } from '../components/utilities';

const resizeRoute = Router();

resizeRoute.get('/', (req: Request, res: Response): void => {
    const params: queryParams = utils.readParams(req);
    processing(params).then((rtn) => {
        if (rtn.completed) {
            res.status(rtn.statusCode || 200).sendFile(rtn.message || '');
        } else {
            res.status(rtn.statusCode || 404).send(rtn.message);
        }
    });
});

export default resizeRoute;
