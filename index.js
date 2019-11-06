const puppeteer = require('puppeteer')
const XLSX = require('xlsx');
const { writeFile } = require('fs');

async function scrape() {
    const arr = [];
    try {
        const browser = await puppeteer.launch({
            headless: false,
            devtools: true
            // slowMo: 100
        })
        const page = await browser.newPage()

        // page.on('console', msg => console.log('PAGE LOG:', msg.text()));
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

        for (let i = 0; i < 2; i++) {
            await page.type('input.gwt-SuggestBox', `Budapest  ${i + 1}. kerület`)
            await page.click('button.gwt-Button');
            await page.waitFor(500);
            await page.waitForSelector('#mainArea > div > table > tbody > tr:nth-child(4) > td');

            let data = await page.evaluate(() => {
                const getDataFromRow = (row) => {
                    return row.firstElementChild.nextElementSibling.textContent;
                }

                let aggrOfficeData = []
                let container = document.querySelector('#mainArea > div > table > tbody > tr:nth-child(4) > td');
                let offices = Array.from(container.querySelectorAll('div.gwt-HTML'));

                offices.forEach(office => {
                    let officeDataRows = Array.from(office.querySelectorAll('tr'));
                    aggrOfficeData.push({
                        name: getDataFromRow(officeDataRows[1]),
                        address: getDataFromRow(officeDataRows[5]),
                        phone: getDataFromRow(officeDataRows[6]),
                        email: getDataFromRow(officeDataRows[7]),
                        web: officeDataRows[8].firstElementChild.nextElementSibling.firstElementChild.getAttribute('href')
                    });
                })
                return aggrOfficeData;
            })
            arr.push(data);
            await page.click('input.gwt-SuggestBox', { clickCount: 3 })
        }
        // await browser.close()
        return arr
    } catch (err) {
        console.error(err)
    }
}

(function createSheets() {
// (async function createSheets() {
    // const returnedData = await scrape();
    // console.log(returnedData);
    // const sheetName = 'sheeet';
    // const sheet = XLSX.utils.json_to_sheet(returnedData[1]);
    // const wb = XLSX.utils.book_new();
    // XLSX.writeFile(wb, sheet);
    const data = [[{
        name: 'dr. Józsa Krisztina Marianna',
        address: '1015 Budapest,Hattyú utca 16. IV/8.',
        phone: '+36 (30) 479 4796, +36 (1) 225 8390, +36 (1) 225 8391',
        email: 'jozsa@mokk.hu',
        web: 'https:\\\\jozsa.kozjegyzok.mokk.hu'
    },
    {
        name: 'dr. Andrásiné dr. Szabó Emőke',
        address: '1015 Budapest,Batthyány utca 10. I/1.',
        phone: '+36 (1) 225 0286, +36 (1) 225 0287',
        email: 'szaboemo@mokk.hu',
        web: 'https:\\\\szaboemo.kozjegyzok.mokk.hu'
    }],
    [{
        name: 'dr. Asbóth-Hermányi Lőrinc Bence',
        address: '1024 Budapest,Szilágyi Erzsébet fasor 1. fszt. 1.',
        phone: '+36 (1) 786 9487, +36 (1) 786 9578',
        email: 'asboth-hermanyi.lorinc@mokk.hu',
        web: 'https:\\\\asboth-hermanyilorinc.kozjegyzok.mokk.hu'
    },
    {
        name: 'dr. Berberovics Mirjana',
        address: '1022 Budapest,Füge utca 2/B. FSZT. 1-2.',
        phone: '+36 (1) 613 0140',
        email: 'berberovics@mokk.hu',
        web: 'https:\\\\berberovics.kozjegyzok.mokk.hu'
    },
    {
        name: 'dr. Varga Krisztina',
        address: '1027 Budapest,Csalogány utca 21. I/3.',
        phone: '+36 (1) 202 4276, +36 (1) 213 9433',
        email: 'vargakrisztina@mokk.hu, iroda.vk@kozjegyzo.hu',
        web: 'https:\\\\vargakrisztina.kozjegyzok.mokk.hu'
    },
    {
        name: 'dr. Szalontai Magdolna Rozália',
        address: '1027 Budapest,Csalogány utca 7. I/1.',
        phone: '+36 (1) 225 3307, +36 (1) 225 3308',
        email: 'szalontai@mokk.hu',
        web: 'https:\\\\szalontai.kozjegyzok.mokk.hu'
    }]];

    const fileName = 'sheeet.xlsx';
    const sheetName = 'Sheeet';
    const sheet = XLSX.utils.json_to_sheet(data[1]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, sheet, sheetName);
    
    // const result = XLSX.write(wb, {});
    XLSX.writeFile(wb, fileName);

// // Write to a file
// writeFile('./hello.xlsx',result)
})();