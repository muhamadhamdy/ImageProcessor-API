import path from 'path';
import { Request } from 'express';
import fs from 'fs';
import { sitePath } from '../index';

export interface queryParams {
    imageName: string;
    height: number;
    width: number;
}

export interface resizeParams {
    sourceImageName: string;
    targetImageName: string;
    extension: string;
    height: number;
    width: number;
}

export interface processReturn {
    completed?: boolean;
    statusCode?: number;
    message?: string;
}

// ======================== Read query parameters ======================
const readParams = (req: Request): queryParams => {
    let qParams: queryParams = { imageName: '', height: 0, width: 0 };
    qParams.imageName = req.query.imagename?.toString() || '';
    qParams.height = parseInt(req.query.height?.toString() || '0');
    qParams.width = parseInt(req.query.width?.toString() || '0');
    return qParams;
};

// ======================== validate query parameters ======================
const isParamsValid = (params: queryParams): string => {
    if (params.imageName == '') {
        return 'Error reading parameters, please check it again.\n Calls must be in format YOURSERVERNAME/resize?imagename=YOURIMAGENAME.EXT&height=NUMBER&width=NUMBER';
    } else if (
        isNaN(params.height) ||
        isNaN(params.width) ||
        params.height <= 0 ||
        params.width <= 0
    ) {
        return 'Values of height and width must be a positive number over 0.';
    }
    return 'OK';
};
// ======================== Check if file exists ======================
const fileExists = async (
    imageName: string,
    filePath: string
): Promise<boolean> => {
    //console.log('enterd fileexist func')
    const fPath = path.join(filePath, imageName).normalize();
    return fs.promises
        .access(fPath, fs.constants.F_OK)
        .then(() => true)
        .catch(() => false);
};

// ======================= Get input folder path ======================
const getInputPath = (): string => {
    const folderPath = path.resolve(sitePath, '../resources/images/full');
    return folderPath;
};

// ======================= Get output folder path =====================
const getOutputPath = (): string => {
    const folderPath = path.resolve(sitePath, '../resources/images/thumbnail');
    return folderPath;
};

// ====================== Get thumbnail file name =====================
const getThumbnailName = (params: queryParams): string => {
    const strFileName: string[] = params.imageName.split('.');
    return strFileName[0].concat(
        '_',
        params.height.toString(),
        '_',
        params.width.toString(),
        '.',
        strFileName[1]
    );
};

// ===================== Get full images filenames ====================
const getfullImagesNames = (imagesPath: string): string[] => {
    try {
        return fs.readdirSync(imagesPath);
    } catch {
        return [];
    }
};

export default {
    readParams,
    isParamsValid,
    fileExists,
    getInputPath,
    getOutputPath,
    getThumbnailName,
    getfullImagesNames
};
