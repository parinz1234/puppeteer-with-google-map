const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();
    const pickUpLocation = { lat: 14.604486, lng: 100.245560 };
    const dropOffLocation = { lat: 14.604176, lng: 100.244720 }
    await page.goto(`https://www.google.co.th/maps/dir/${pickUpLocation.lat},${pickUpLocation.lng}/${dropOffLocation.lat},${dropOffLocation.lng}/data=!4m6!4m5!2m3!1b1!2b1!3b1!3e0`);

    await page.waitForSelector('.section-directions-trip-distance.section-directions-trip-secondary-text');
    const distanceElementHandler = await page.$('.section-directions-trip-distance.section-directions-trip-secondary-text');
    const content = await distanceElementHandler.evaluate(node => node.lastElementChild.innerHTML);
    console.log(`Distance is: ${content}`);
    await browser.close();
})();