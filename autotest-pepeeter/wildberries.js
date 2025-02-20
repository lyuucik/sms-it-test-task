const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false, devtools: false, defaultViewport: null,
     args: [
      '--start-maximized',
    ] });
  const page = await browser.newPage();
  await page.goto('https://www.wildberries.ru');

  await page.type('#searchInput', 'транспортир');
  await page.keyboard.press('Enter');
  await page.waitForNavigation({ waitUntil: 'networkidle2' });

  await page.waitForSelector('.filter-switch');
  await page.hover('.dropdown-filter__btn.dropdown-filter__btn--sorter');
  await page.waitForSelector('li.filter__item.j-catalog-sort:nth-child(3)');
  await page.click('li.filter__item.j-catalog-sort:nth-child(3)');

  const products = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.product-card'))
      .slice(0, 10)
      .map(card => ({
        name: card
          .querySelector('.product-card__link.j-card-link.j-open-full-product-card')
          ?.getAttribute("aria-label").trim() || 'Название не найдено',
        price: card
          .querySelector('.price__wrap ins')
          ?.innerText.trim() || 'Цена не найдена',
      }));
  });

  console.log(products);
  await browser.close();
})();