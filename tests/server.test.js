const request = require('supertest');
const path = require('path');
const fs = require('fs');

// Import server app (assuming it's exported in server.js)
// If not exported, you may need to modify server.js
const app = require('../src/server');

describe('Server Routes', () => {
  test('GET / should serve the index.html page', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toContain('text/html');
    
    // Read index.html file to compare content
    const indexHtml = fs.readFileSync(path.join(__dirname, '../src/public/index.html'), 'utf8');
    expect(response.text).toContain('<form id="greeting-form">');
  });

  test('GET /css/style.css should serve the CSS file', async () => {
    const response = await request(app).get('/css/style.css');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toContain('text/css');
  });

  test('GET /js/main.js should serve the JavaScript file', async () => {
    const response = await request(app).get('/js/main.js');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toContain('application/javascript');
  });

  test('GET /nonexistent-route should return 404', async () => {
    const response = await request(app).get('/nonexistent-route');
    expect(response.status).toBe(404);
  });
});