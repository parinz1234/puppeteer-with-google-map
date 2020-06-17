const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();
    await page.goto('https://www.google.co.th/maps/dir///data=!4m2!4m1!3e0');
    const pickUpLocation = { lat: 14.604486, lng: 100.245560 };
    const dropOffLocation = { lat: 14.604176, lng: 100.244720 }

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

    await page.waitForSelector('.section-directions-trip-distance.section-directions-trip-secondary-text');
    const distanceElementHandler = await page.$('.section-directions-trip-distance.section-directions-trip-secondary-text');
    const content = await distanceElementHandler.evaluate(node => node.lastElementChild.innerHTML);
    console.log(`Distance is: ${content}`);
    await browser.close();
})();