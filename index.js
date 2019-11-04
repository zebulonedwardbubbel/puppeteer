const puppeteer = require('puppeteer')
const arr = [];

try {
  (async () => {
    const browser = await puppeteer.launch({
        headless: false
        // slowMo: 100
    })
    const page = await browser.newPage()
    // await page.setRequestInterception(true);
    // page.on('request', interceptedRequest => {
    //     if (interceptedRequest.resourceType() === 'document') {
    //         interceptedRequest.continue();
    //     } else {
    //         interceptedRequest.abort();
    //     }
    // });
    await page.goto('https://start.mokk.hu/kozjegyzokereso.html')
    await page.waitForSelector('input.gwt-SuggestBox');
    // (async () => {
      for (let i = 0; i < 2; i++) {
        await page.type('input.gwt-SuggestBox', `Budapest  ${i + 1}. kerület`)
        await page.click('button.gwt-Button');
        await page.waitForSelector('#mainArea > div > table > tbody > tr:nth-child(4)');
        const addresses = await page.$('#mainArea > div > table > tbody > tr:nth-child(4)')
        arr.push(addresses);
        await page.click('input.gwt-SuggestBox', { clickCount: 3 })
        await page.waitFor(1000);
      }
    // })();
    console.log(arr);
    // const selectOptions = await page.$$eval('#mainArea > div > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr:nth-child(1) > td > table > tbody > tr > td > table > tbody > tr:nth-child(4) > td:nth-child(2) > input > option', options => { return options.map(option => option.value ) })
    // console.log(selectOptions)
    // await page.waitFor(1000);
    // const inputElement = await page.$('#mainArea > div > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr:nth-child(3) > td > table > tbody > tr > td > table > tbody > tr:nth-child(9) > td:nth-child(2) > select');
    // await inputElement.select('Budapest')
    // const searchElement = await page.$('button.gwt-Button');
    // await searchElement.click()
    // await page.type('gwt-SuggestBox', 'Budapest')
    // const inputEl = await page.$('input')
    // await page.waitForSelector('#hotellist_inner')
    // await page.screenshot({ path: 'screenshot.png' })
    // const hotels = await page.$$eval('span.sr-hotel__name', anchors => {
    //   return anchors.map(anchor => anchor.textContent.trim()).slice(0, 10)
    // })
    // console.log(inputElement)
    // await browser.close()
    // console.log('See screenshot: ' + screenshot)
  })()
} catch (err) {
  console.error(err)
}
