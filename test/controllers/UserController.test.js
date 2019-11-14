const request = require('supertest');
const { beforeAction, afterAction } = require('../setup/_setup');

let api;

beforeAll(async () => {
  api = await beforeAction();
});

afterAll(() => {
  afterAction();
});

test('User | login', async () => {
  const res = await request(api)
    .post('/public/login')
    .set('Accept', /json/)
    .send({
      username: 'Luke Skywalker',
      password: '19BBY'
    })
    .expect(200);

  expect(res.body.token).toBeTruthy();

  expect(user).toBeTruthy();

  await user.destroy();
});
