import { AppPage } from './app.po';
import { by, element, browser } from 'protractor';

describe('angular-weather App', () => {
  let page: AppPage;

  beforeEach(async () => {

    page = new AppPage();
    await page.navigateTo();

  });

  // TODO : add tests fore forecast details.

  it('e2e should display header (AgileSphere coding test - The Weather App)', async () => {

    await expect(page.getParagraphText()).toEqual('AgileSphere coding test - The Weather App');

  });

  it('e2e should search city and display forecast', async () => {

    await element(by.css('#cityName')).sendKeys('London'); // city name.
    await element(by.css('#searchButton')).click();

    const london = element(by.id('London'));

    expect(london.isPresent()).toBeTruthy();
  });

  it('e2e should not display fake city', async () => {

    await element(by.css('#cityName')).sendKeys('Fakeham'); // city name.
    await element(by.css('#searchButton')).click();
    const fakeham = element(by.id('Fakeham'));

    expect(fakeham.isPresent()).toBeFalsy();
  });

  it('e2e should list all cities', async function () {

    await element(by.css('#cityName')).sendKeys('London'); // city name.
    await element(by.css('#searchButton')).click();
    const london = await element(by.id('London'));

    await element(by.css('#cityName')).sendKeys('Chelmsford'); // city name.
    await element(by.css('#searchButton')).click();
    const chelmsford = element(by.id('Chelmsford'));

    await element(by.css('#cityName')).sendKeys('Paris'); // city name.
    await element(by.css('#searchButton')).click();
    const paris = element(by.id('Paris'));

    expect(london.isPresent() && chelmsford.isPresent() && paris.isPresent() ).toBeTruthy();
  });

});
