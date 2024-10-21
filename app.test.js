const request = require('supertest');
const { app, server } = require('./server'); // Adjust the path based on your setup

describe('Test the root path', () => {
    afterAll(() => {
        server.close();
    });

    test('It should respond with a 200 status code', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });
});

describe('Test static files', () => {
    test('It should serve the CSS file', async () => {
        const response = await request(app).get('/styles.css');
        expect(response.statusCode).toBe(200);
        expect(response.header['content-type']).toBe('text/css; charset=UTF-8');
    });
});
