import sharp, { FormatEnum } from "sharp";
import { resizeParams } from "./utilities";

const sharpImage = async (params: resizeParams): Promise<boolean> => {
  try {
    await sharp(params.sourceImageName)
      .resize(params.width, params.height)
      .toFormat("jpeg")
      .toFile(params.targetImageName);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export default sharpImage;
