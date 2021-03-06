const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();
    // await page.setCacheEnabled(false);
    await page.goto('https://www.google.co.th/maps/dir///data=!4m2!4m1!3e0');
    const pickUpLocation = { lat: 14.604486, lng: 100.24556 };
    const dropOffLocation = { lat: 14.5918192, lng: 100.271392 }

    // waiting for selector
    await page.waitForSelector('.searchbox');
    const searchBoxElementHandlers = await page.$$('.searchbox input');

    // 1. get element for start
    const startPointElementHandler = searchBoxElementHandlers[0];
    // 2. get element for end
    const endPointElementHandler = searchBoxElementHandlers[1];

    // 3. type lat, lng for start point
    await startPointElementHandler.type(`${pickUpLocation.lat}, ${pickUpLocation.lng}`);
    // 4. type 
    await endPointElementHandler.type(`${dropOffLocation.lat}, ${dropOffLocation.lng}`);

    // - get element to trigger compute
    await endPointElementHandler.type(String.fromCharCode(13));

    // waiting for selector
    await page.waitForSelector('.section-directions-trip-distance.section-directions-trip-secondary-text');
    const distanceElementHandler = await page.$('.section-directions-trip-distance.section-directions-trip-secondary-text');
    const distanceText = await distanceElementHandler.evaluate(node => node.lastElementChild.textContent);
    console.log(`Distance is: ${distanceText}`);
    await browser.close();
})();