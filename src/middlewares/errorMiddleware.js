import { TimeoutError } from "puppeteer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import {
  BadRequestError,
  NotFoundError,
  TooManyRequestError,
} from "../utils/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const errorMiddleware = (err, req, res, next) => {
  if (err) {
    if (err instanceof NotFoundError || err instanceof TimeoutError) {
      const notFoundErrorImage = path.join(
        __dirname,
        "../assets/images/not-found-error.png"
      );

      res.sendFile(notFoundErrorImage);

      return;
    } else if (err instanceof TooManyRequestError) {
      const tooManyRequestErrorImage = path.join(
        __dirname,
        "../assets/images/too-many-request-error.png"
      );

      res.sendFile(tooManyRequestErrorImage);

      return;
    } else if (err instanceof BadRequestError) {
      const badRequestErrorImage = path.join(
        __dirname,
        "../assets/images/bad-request-error.png"
      );

      res.sendFile(badRequestErrorImage);

      return;
    } else {
      const serverErrorImage = path.join(
        __dirname,
        "../assets/images/server-error.png"
      );

      res.sendFile(serverErrorImage);

      return;
    }
  }

  next();
};

export { errorMiddleware };
