import { imageConfig } from "../../configs/index.js";
import { BadRequestError } from "../errors/index.js";

const getImageContentTypeFromExtension = (extension) => {
  if (typeof extension !== "string") {
    return imageConfig.DEFAULT_IMAGE_CONTENT_TYPE;
  }

  if (!imageConfig.ALLOWED_IMAGE_EXTENSION.includes(extension))
    throw new BadRequestError();

  return imageConfig.EXTENSION_CONTENT_TYPE[extension];
};

export { getImageContentTypeFromExtension };
