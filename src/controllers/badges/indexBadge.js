import puppeteer from "puppeteer";
import dotenv from "dotenv";

dotenv.config();

const hackerrankBaseUrl = process.env.HACKERRANK_BASE_URL;

const indexBadge = async (req, res, next) => {
  try {
    const { username } = req.params;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36"
    );

    await page.goto(`${hackerrankBaseUrl}/${username}`);

    // Set screen size
    await page.setViewport({ width: 1920, height: 1080 });

    const elem = await page.waitForSelector(".section-card.hacker-badges");

    if (!elem) {
      throw new Error("Element not Found");
    }

    const buffer = await elem.screenshot({
      type: "webp",
      quality: 100,
    });

    await browser.close();
    res.set("Content-Type", "image/webp");
    res.send(buffer);
  } catch (error) {
    next(error);
  }
};

export { indexBadge };
