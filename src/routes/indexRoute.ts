import { Request, Response, Router } from 'express';
import utils from '../components/utilities';

const indexRoute = Router();

indexRoute.get('/', (req: Request, res: Response): void => {
    const arr = utils.getfullImagesNames(utils.getInputPath());
    let s = '';
    arr.map((e) => {
        s += '<li>'.concat(e, '</li>');
    });
    const resString = `<h3>IMAGES AVAILABLE ON SEREVER</h3><hr>
                    <ul>${s}</ul><hr>
                    to call resize api use the format<br>
                    <strong>YOURSERVERNAME/resize?imagename=YOURIMAGENAME.EXT&height=NUMBER&width=NUMBER</strong><br>
                    <p>for example</p><a href='/resize?imagename=palmtunnel.jpg&height=400&width=400'>mySiteName/resize?imagename=palmtunnel.jpg&height=400&width=400</a>`;
    res.status(200);
    res.send(resString);
});

export default indexRoute;
