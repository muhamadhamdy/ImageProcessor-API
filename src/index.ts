// Create server
import path from 'path';
import express from 'express';
import indexRoute from './routes/indexRoute';
import resizeRoute from './routes/resizeRoute';

const app = express();
const port = process.env.imageProccessorPort || 3111;

export const sitePath: string = __dirname;

//serve static images in images folder
app.use(
    '/resources/images',
    express.static(path.resolve('../resources/images'))
);
// Main site page route
app.use('/', indexRoute);
// Image resizing route
app.use('/resize', resizeRoute);

// serving at port 3000
app.listen(port, () => {
    console.log(`server started at port number:${port}`);
    //Server local folder : ${sitePath}
});
