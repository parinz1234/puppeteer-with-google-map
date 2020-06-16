const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto('https://www.google.co.th/maps/dir//');
    const pickUpLocation = { lat: 14.604486, lng: 100.245560 };

    await page.type('#directions-searchbox-0 input', `${pickUpLocation.lat}, ${pickUpLocation.lng}`);
    await page.type('#directions-searchbox-1 input', `${pickUpLocation.lat}, ${pickUpLocation.lng}`);
    // const title = await page.evaluate(() => document.querySelector('title').textContent);
    // console.log(title);


    // const title = await page.evaluate(() => document.querySelector('title').click);
    // console.log(title);

    // await browser.close();
})();