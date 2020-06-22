
import puppeteer from "puppeteer"; 

jest.setTimeout(30000);

let browser;
let page;

beforeAll(async () =>{
  browser = await puppeteer.launch({
  });
})

test("Incorrect logins", async () => {
  page = await browser.newPage();
  await page.goto("http://localhost:3000/");
  await page.type('#email', 'user.wrongemail@example.com')
  await page.type('#password', 'WrongPassword')
  await page.click('#button')
  const messageError = await page.$eval('.App>.LogPage>p', el => el.innerHTML);
  expect(messageError).toBe('Incorrect password and email')
});

test("Correct logins", async () => {
  page = await browser.newPage();
  await page.goto("http://localhost:3000/");
  await page.type('#email', 'user.mail@example.com')
  await page.type('#password', 'UserPass123')
  await page.click('#button')
  const messageSuccess = await page.$eval('.App>.Success>p', el => el.innerHTML);
  expect(messageSuccess).toBe('Success')
});

afterAll(() => {
  browser.close();
});


