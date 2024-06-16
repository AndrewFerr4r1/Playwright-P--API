// @ts-check
const { test, expect } = require('@playwright/test');

test('consult registered reservations', async ({ request }) => {
  const response = await request.get('https://restful-booker.herokuapp.com/booking');

  console.log(await response.json());

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200)
});