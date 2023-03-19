import puppeteer from "puppeteer";
import dotenv from "dotenv";
import { NotFoundError } from "../../utils/index.js";

dotenv.config();

const hackerrankBaseUrl = process.env.HACKERRANK_BASE_URL;
const serverUserAgent = process.env.SERVER_USER_AGENT;

const indexBadge = async (req, res, next) => {
  try {
    const { username } = req.params;

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

    const buffer = await elem.screenshot({
      type: "webp",
      quality: 100,
    });

    await browser.close();

    await res.sendData({
      body: buffer,
      headers: {
        "Content-Type": "image/webp",
      },
    });
  } catch (error) {
    next(error);
  }
};

export { indexBadge };
