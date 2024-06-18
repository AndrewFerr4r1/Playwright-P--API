// @ts-check
const { test, expect } = require('@playwright/test');

test('consult registered reservations', async ({ request }) => {
  const response = await request.get('');

  console.log(await response.json());

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
});

test('consult registered reservations by id', async ({ request }) => {
  const response = await request.get('917');

  const jsonBody = await response.json();
  console.log(jsonBody);

  expect(jsonBody.firstname).toBe('Josh');
  expect(jsonBody.lastname).toBe('Allen');
  expect(jsonBody.totalprice).toBe(111);
  expect(jsonBody.depositpaid).toBeTruthy();
  expect(jsonBody.bookingdates.checkin).toBe('2018-01-01');
  expect(jsonBody.bookingdates.checkout).toBe('2019-01-01');
  expect(jsonBody.additionalneeds).toBe('super bowls');

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
});

test('consult registered reservations by id valid fields', async ({ request }) => {
  const response = await request.get('116');

  const jsonBody = await response.json();
  console.log(jsonBody);

  expect(jsonBody).toHaveProperty('firstname');
  expect(jsonBody).toHaveProperty('lastname');
  expect(jsonBody).toHaveProperty('totalprice');
  expect(jsonBody).toHaveProperty('depositpaid');
  expect(jsonBody).toHaveProperty('bookingdates');
  expect(jsonBody).toHaveProperty('additionalneeds');

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
});