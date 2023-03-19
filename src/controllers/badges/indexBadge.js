import puppeteer from "puppeteer";
import dotenv from "dotenv";
import {
  NotFoundError,
  getImageContentTypeFromExtension,
} from "../../utils/index.js";

dotenv.config();

const hackerrankBaseUrl = process.env.HACKERRANK_BASE_URL;
const serverUserAgent = process.env.SERVER_USER_AGENT;

const indexBadge = async (req, res, next) => {
  try {
    const { username } = req.params;
    const { type } = req.query;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent(serverUserAgent);

    await page.goto(`${hackerrankBaseUrl}/${username}`);

    // Set screen size
    await page.setViewport({ width: 1920, height: 1080 });

    const elem = await page.waitForSelector(".section-card.hacker-badges");

    if (!elem) {
      throw new NotFoundError();
    }

    const contentType = getImageContentTypeFromExtension(type);

    const buffer = await elem.screenshot({
      type,
      quality: contentType !== "image/png" ? 100 : undefined,
    });

    await browser.close();

    await res.sendData({
      body: buffer,
      headers: {
        "Content-Type": contentType,
      },
    });
  } catch (error) {
    next(error);
  }
};

export { indexBadge };
