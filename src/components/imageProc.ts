import utils, { processReturn, queryParams, resizeParams } from './utilities';
import path from 'path';
import sharpImage from './sharping';

const processing = async (params: queryParams): Promise<processReturn> => {
    const isValid = utils.isParamsValid(params);
    if (isValid != 'OK') {
        return { completed: false, statusCode: 404, message: isValid };
    }
    const thumnailName = utils.getThumbnailName(params);
    const outputFolder = utils.getOutputPath();
    const inputFolder = utils.getInputPath();
    const fileCheck = await utils.fileExists(thumnailName, outputFolder);
    if (fileCheck) {
        return {
            completed: true,
            statusCode: 200,
            message: path.join(outputFolder, thumnailName)
        };
    }
    const procParms: resizeParams = {
        sourceImageName: path.join(inputFolder, params.imageName),
        targetImageName: path.join(outputFolder, thumnailName),
        extension: 'jpg',
        height: params.height,
        width: params.width
    };
    const procRes = await sharpImage(procParms);
    if (procRes === false) {
        return {
            completed: false,
            statusCode: 500,
            message: 'error resizing image'
        };
    }
    return {
        completed: true,
        statusCode: 200,
        message: path.join(outputFolder, thumnailName)
    };
};

export default processing;
