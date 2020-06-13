import axios from 'axios';
import config from '../config.json';

const baseUrl = config.env.sit;

describe('When posting a client', () => {
  it('should validate the request and return http status code 200 for valid requests', async () => {
    const client = {
      title: 'Mr',
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '123456789',
    };

    const response = await axios({
      url: `${baseUrl}/clients`,
      method: 'post',
      data: JSON.stringify(client),
      headers: { 'Content-Type': 'application/json' },
    });

    expect(response.status).toBe(201);
  });

  it('should validate the request and return http status code 400 for invalid requests', async () => {
    const client = {
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '123456789',
    };

    const response = await axios({
      url: `${baseUrl}/clients`,
      method: 'post',
      data: JSON.stringify(client),
      headers: { 'Content-Type': 'application/json' },
      validateStatus: function (status) {
        return status >= 200 && status < 500;
      },
    });

    expect(response.status).toBe(400);
  });
});

describe('When getting all clients', () => {
  it('should return a list of clients and http status code 200', async () => {
    const response = await axios({
      url: `${baseUrl}/clients`,
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    });

    expect(response.data.length).toBeGreaterThan(0);
    expect(response.status).toBe(200);
  });
});
