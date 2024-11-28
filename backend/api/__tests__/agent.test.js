const request = require('supertest');
const app = require('../app');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

describe('Agent API Endpoints', () => {
  let authToken;
  let testAgentId;

  beforeAll(async () => {
    // Create a test user and get auth token
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'Test123!@#'
      });
    authToken = loginResponse.body.token;
  });

  afterAll(async () => {
    // Clean up test data
    await prisma.agent.deleteMany({
      where: {
        email: 'testagent@example.com'
      }
    });
    await prisma.$disconnect();
  });

  describe('POST /api/agents/register', () => {
    it('should register a new agent', async () => {
      const response = await request(app)
        .post('/api/agents/register')
        .set('Authorization', `Bearer ${authToken}`)
        .field('fullName', 'Test Agent')
        .field('email', 'testagent@example.com')
        .field('phone', '+2348012345678')
        .field('experience', '5 years')
        .field('specialization', 'Residential')
        .field('location', 'Lagos')
        .field('about', 'A professional real estate agent with extensive experience in the Lagos market.')
        .attach('photo', '__tests__/fixtures/test-photo.jpg')
        .attach('idDocument', '__tests__/fixtures/test-document.pdf');

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      testAgentId = response.body.id;
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/agents/register')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          fullName: 'Test Agent'
          // Missing required fields
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
    });
  });

  describe('GET /api/agents', () => {
    it('should return a list of agents', async () => {
      const response = await request(app)
        .get('/api/agents')
        .query({ page: 1, limit: 10 });

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.agents)).toBe(true);
    });

    it('should filter agents by location', async () => {
      const response = await request(app)
        .get('/api/agents')
        .query({ location: 'Lagos' });

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.agents)).toBe(true);
      response.body.agents.forEach(agent => {
        expect(agent.location).toBe('Lagos');
      });
    });
  });

  describe('GET /api/agents/:id', () => {
    it('should return agent details', async () => {
      const response = await request(app)
        .get(`/api/agents/${testAgentId}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('fullName', 'Test Agent');
    });

    it('should return 404 for non-existent agent', async () => {
      const response = await request(app)
        .get('/api/agents/nonexistentid');

      expect(response.status).toBe(404);
    });
  });

  describe('PATCH /api/agents/:id', () => {
    it('should update agent profile', async () => {
      const response = await request(app)
        .patch(`/api/agents/${testAgentId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .field('experience', '6 years')
        .field('about', 'Updated profile description');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('experience', '6 years');
    });
  });

  describe('POST /api/agents/:agentId/reviews', () => {
    it('should add a review for an agent', async () => {
      const response = await request(app)
        .post(`/api/agents/${testAgentId}/reviews`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          rating: 5,
          comment: 'Excellent service!',
          propertyId: 'test-property-id'
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('rating', 5);
    });
  });
});
