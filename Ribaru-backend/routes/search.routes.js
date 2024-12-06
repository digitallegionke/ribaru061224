const express = require('express');
const { auth } = require('../middleware/auth');
const prisma = require('../config/db');
const router = express.Router();

// Search posts
router.get('/posts', async (req, res) => {
  try {
    const { q, tag, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const where = {
      published: true,
      OR: [
        { title: { contains: q, mode: 'insensitive' } },
        { content: { contains: q, mode: 'insensitive' } }
      ],
      ...(tag && {
        tags: {
          some: {
            name: { equals: tag, mode: 'insensitive' }
          }
        }
      })
    };

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              profileImage: true
            }
          },
          tags: true,
          _count: {
            select: {
              likes: true,
              comments: true
            }
          }
        }
      }),
      prisma.post.count({ where })
    ]);

    res.json({
      posts,
      total,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Search users
router.get('/users', async (req, res) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const where = {
      OR: [
        { name: { contains: q, mode: 'insensitive' } },
        { email: { contains: q, mode: 'insensitive' } }
      ]
    };

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: Number(limit),
        select: {
          id: true,
          name: true,
          email: true,
          profileImage: true,
          bio: true,
          _count: {
            select: {
              posts: true,
              followers: true,
              following: true
            }
          }
        }
      }),
      prisma.user.count({ where })
    ]);

    res.json({
      users,
      total,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get trending tags
router.get('/trending-tags', async (req, res) => {
  try {
    const tags = await prisma.tag.findMany({
      take: 10,
      include: {
        _count: {
          select: {
            posts: true
          }
        }
      },
      orderBy: {
        posts: {
          _count: 'desc'
        }
      }
    });

    res.json(tags);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
