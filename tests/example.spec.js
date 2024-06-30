// @ts-check
const { test, expect } = require('@playwright/test');

var tokenResponse;
var id;

test('consult registered reservations @regressivo', async ({ request }) => {
  const response = await request.get('booking');

  console.log(await response.json());

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
});

test('consult registered reservations by id', async ({ request }) => {
  const response = await request.get('booking/1662');

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
  const response = await request.get('booking/116');

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

test('create booking', async ({ request }) => {
  const response = await request.post('booking', {
    data: {
      "firstname": "Andrew",
      "lastname": "Test",
      "totalprice": 444,
      "depositpaid": true,
      "bookingdates": {
        "checkin": "2018-01-01",
        "checkout": "2019-01-01"
      },
      "additionalneeds": "Breakfast"
    }

  });
  console.log(await response.json());


  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const jsonBody = await response.json();

  expect(jsonBody.booking.firstname).toBe('Andrew');
  expect(jsonBody.booking.lastname).toBe('Test');
  expect(jsonBody.booking.totalprice).toBe(444);
  expect(jsonBody.booking.depositpaid).toBeTruthy();
  expect(jsonBody.booking.bookingdates.checkin).toBe('2018-01-01');
  expect(jsonBody.booking.bookingdates.checkout).toBe('2019-01-01');
  expect(jsonBody.booking.additionalneeds).toBe('Breakfast');

});

test('update partial', async ({ request }) => {
  const response = await request.post('auth', {
    data: {
      "username": "admin",
      "password": "password123"
    }
  });
  console.log(await response.json());

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  tokenResponse = responseBody.token;

  const partialUpdateRequest =  await request.patch(`booking/20`, { 
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Cookie': `token=${tokenResponse}`
    },
    data: {
      "firstname": "Test",
      "lastname": "Retest",
      "totalprice": 222,
      "depositpaid": false,
      "bookingdates": {
        "checkin": "2020-01-01",
        "checkout": "2021-01-01"
      },
      "additionalneeds": "Lunch"
    }
  });

  expect(partialUpdateRequest.ok()).toBeTruthy();
  expect(partialUpdateRequest.status()).toBe(200);

  const jsonBody = await partialUpdateRequest.json();

  expect(jsonBody.firstname).toBe('Test');
  expect(jsonBody.lastname).toBe('Retest');
  expect(jsonBody.totalprice).toBe(222);
  expect(jsonBody.depositpaid).toBeFalsy();
  expect(jsonBody.bookingdates.checkin).toBe('2020-01-01');
  expect(jsonBody.bookingdates.checkout).toBe('2021-01-01');
  expect(jsonBody.additionalneeds).toBe('Lunch');

});