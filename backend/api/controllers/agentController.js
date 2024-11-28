const agentService = require('../services/agentService');
const { validateAgentRegistration, validateAgentUpdate } = require('../utils/validation');
const { handleError } = require('../utils/errorHandler');

class AgentController {
  async register(req, res) {
    try {
      const validation = validateAgentRegistration(req.body);
      if (!validation.success) {
        return res.status(400).json({ errors: validation.errors });
      }

      if (!req.files?.photo || !req.files?.idDocument) {
        return res.status(400).json({
          error: 'Profile photo and ID document are required'
        });
      }

      const result = await agentService.createAgent(req.body, req.files);
      res.status(201).json(result);
    } catch (error) {
      handleError(res, error);
    }
  }

  async getAgent(req, res) {
    try {
      const agent = await agentService.getAgentById(req.params.id);
      res.json(agent);
    } catch (error) {
      handleError(res, error);
    }
  }

  async updateAgent(req, res) {
    try {
      const validation = validateAgentUpdate(req.body);
      if (!validation.success) {
        return res.status(400).json({ errors: validation.errors });
      }

      const agent = await agentService.updateAgent(req.params.id, req.body, req.files || {});
      res.json(agent);
    } catch (error) {
      handleError(res, error);
    }
  }

  async getAllAgents(req, res) {
    try {
      const { page = 1, limit = 10, ...filters } = req.query;
      const result = await agentService.getAllAgents(filters, parseInt(page), parseInt(limit));
      res.json(result);
    } catch (error) {
      handleError(res, error);
    }
  }

  async searchAgents(req, res) {
    try {
      const { query, page = 1, limit = 10 } = req.query;
      if (!query) {
        return res.status(400).json({ error: 'Search query is required' });
      }

      const result = await agentService.searchAgents(query, parseInt(page), parseInt(limit));
      res.json(result);
    } catch (error) {
      handleError(res, error);
    }
  }

  async addReview(req, res) {
    try {
      const { agentId } = req.params;
      const review = await agentService.addAgentReview(agentId, {
        ...req.body,
        userId: req.user.id // Assuming we have user info from auth middleware
      });
      res.status(201).json(review);
    } catch (error) {
      handleError(res, error);
    }
  }

  async verifyAgent(req, res) {
    try {
      // This endpoint should be admin-only
      if (!req.user.isAdmin) {
        return res.status(403).json({ error: 'Unauthorized' });
      }

      const agent = await agentService.verifyAgent(req.params.id);
      res.json(agent);
    } catch (error) {
      handleError(res, error);
    }
  }
}

module.exports = new AgentController();
