const prisma = require('../db/prisma');
const { hashPassword, comparePasswords } = require('../utils/auth');
const { uploadImage } = require('../utils/cloudinary');
const { generateToken } = require('../utils/jwt');

class AgentService {
  async createAgent(data, files) {
    try {
      // Upload profile photo and documents
      const profilePhotoUrl = await uploadImage(files.photo[0], 'agent-photos');
      const idDocumentUrl = await uploadImage(files.idDocument[0], 'agent-documents');
      const licenseUrl = files.licenseDocument ? 
        await uploadImage(files.licenseDocument[0], 'agent-licenses') : null;

      // Hash password
      const hashedPassword = await hashPassword(data.password);

      // Create agent in database
      const agent = await prisma.agent.create({
        data: {
          fullName: data.fullName,
          email: data.email,
          password: hashedPassword,
          phone: data.phone,
          whatsapp: data.whatsapp || data.phone,
          experience: data.experience,
          specialization: data.specialization,
          location: data.location,
          about: data.about,
          profilePhoto: profilePhotoUrl,
          idDocument: idDocumentUrl,
          licenseDocument: licenseUrl,
          linkedin: data.linkedin,
          twitter: data.twitter,
          instagram: data.instagram,
          verified: false, // Agents need to be verified by admin
          stats: {
            create: {
              activeListings: 0,
              propertiesSold: 0,
              averageRating: 0,
              responseTime: "0",
              totalReviews: 0
            }
          }
        },
        include: {
          stats: true
        }
      });

      // Generate JWT token
      const token = generateToken(agent.id);

      return {
        agent: {
          id: agent.id,
          fullName: agent.fullName,
          email: agent.email,
          verified: agent.verified,
          profilePhoto: agent.profilePhoto
        },
        token
      };
    } catch (error) {
      throw new Error(`Failed to create agent: ${error.message}`);
    }
  }

  async getAgentById(id) {
    try {
      const agent = await prisma.agent.findUnique({
        where: { id },
        include: {
          stats: true,
          reviews: {
            orderBy: { createdAt: 'desc' },
            take: 10
          },
          properties: {
            where: { status: 'ACTIVE' },
            include: {
              images: true
            }
          }
        }
      });

      if (!agent) {
        throw new Error('Agent not found');
      }

      return agent;
    } catch (error) {
      throw new Error(`Failed to get agent: ${error.message}`);
    }
  }

  async updateAgent(id, data, files = {}) {
    try {
      const updateData = { ...data };

      // Handle file uploads if any
      if (files.photo) {
        updateData.profilePhoto = await uploadImage(files.photo[0], 'agent-photos');
      }
      if (files.licenseDocument) {
        updateData.licenseDocument = await uploadImage(files.licenseDocument[0], 'agent-licenses');
      }

      const agent = await prisma.agent.update({
        where: { id },
        data: updateData,
        include: {
          stats: true
        }
      });

      return agent;
    } catch (error) {
      throw new Error(`Failed to update agent: ${error.message}`);
    }
  }

  async getAllAgents(filters = {}, page = 1, limit = 10) {
    try {
      const where = {};
      
      // Apply filters
      if (filters.verified !== undefined) {
        where.verified = filters.verified;
      }
      if (filters.location) {
        where.location = { contains: filters.location, mode: 'insensitive' };
      }
      if (filters.specialization) {
        where.specialization = { contains: filters.specialization, mode: 'insensitive' };
      }

      // Get total count for pagination
      const total = await prisma.agent.count({ where });

      // Get agents with pagination
      const agents = await prisma.agent.findMany({
        where,
        include: {
          stats: true
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          createdAt: 'desc'
        }
      });

      return {
        agents,
        pagination: {
          total,
          pages: Math.ceil(total / limit),
          currentPage: page,
          perPage: limit
        }
      };
    } catch (error) {
      throw new Error(`Failed to get agents: ${error.message}`);
    }
  }

  async searchAgents(query, page = 1, limit = 10) {
    try {
      const where = {
        OR: [
          { fullName: { contains: query, mode: 'insensitive' } },
          { location: { contains: query, mode: 'insensitive' } },
          { specialization: { contains: query, mode: 'insensitive' } },
          { about: { contains: query, mode: 'insensitive' } }
        ]
      };

      const total = await prisma.agent.count({ where });

      const agents = await prisma.agent.findMany({
        where,
        include: {
          stats: true
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          stats: {
            averageRating: 'desc'
          }
        }
      });

      return {
        agents,
        pagination: {
          total,
          pages: Math.ceil(total / limit),
          currentPage: page,
          perPage: limit
        }
      };
    } catch (error) {
      throw new Error(`Failed to search agents: ${error.message}`);
    }
  }

  async addAgentReview(agentId, data) {
    try {
      const review = await prisma.agentReview.create({
        data: {
          agentId,
          ...data
        }
      });

      // Update agent stats
      const reviews = await prisma.agentReview.findMany({
        where: { agentId }
      });

      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = totalRating / reviews.length;

      await prisma.agentStats.update({
        where: { agentId },
        data: {
          averageRating,
          totalReviews: reviews.length
        }
      });

      return review;
    } catch (error) {
      throw new Error(`Failed to add review: ${error.message}`);
    }
  }

  async verifyAgent(id) {
    try {
      const agent = await prisma.agent.update({
        where: { id },
        data: { verified: true }
      });

      return agent;
    } catch (error) {
      throw new Error(`Failed to verify agent: ${error.message}`);
    }
  }
}

module.exports = new AgentService();
