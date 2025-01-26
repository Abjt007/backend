const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const User = require('../../models/User');

describe('Field Worker Routes', () => {
  let token;

  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true });

    // Register and login to get the field worker token
    await request(app)
      .post('/api/auth/register')
      .send({ username: 'fieldworker', password: 'fieldpassword' });

    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({ username: 'fieldworker', password: 'fieldpassword' });

    token = loginResponse.body.token;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should get a list of all aid records', async () => {
    const response = await request(app)
      .get('/api/field-worker/aid-records')
      .set('Authorization', Bearer ${token});

    expect(response.status).toBe(200);
    expect(response.body.aidRecords).toBeDefined();
  });

  it('should add a new aid record', async () => {
    const newAidRecord = {
      refugeeId: 'refugeeId123',
      aidType: 'Food',
      quantity: 10,
    };

    const response = await request(app)
      .post('/api/field-worker/aid-records')
      .set('Authorization', Bearer ${token})
      .send(newAidRecord);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Aid record added successfully');
  });
});