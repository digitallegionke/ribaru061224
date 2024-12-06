const express = require('express');
const { auth } = require('../middleware/auth');
const prisma = require('../config/db');

const router = express.Router();

// Create post
router.post('/', auth, async (req, res) => {
  try {
    const { title, content, imageUrl, tags } = req.body;

    const post = await prisma.post.create({
      data: {
        title,
        content,
        imageUrl,
        author: { connect: { id: req.user.id } },
        tags: {
          connectOrCreate: tags.map(tag => ({
            where: { name: tag },
            create: { name: tag }
          }))
        }
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            profileImage: true
          }
        },
        tags: true
      }
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, tag } = req.query;
    const skip = (page - 1) * limit;

    const where = {
      published: true,
      ...(tag && {
        tags: {
          some: {
            name: tag
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

// Get single post
router.get('/:id', async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            profileImage: true
          }
        },
        tags: true,
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                profileImage: true
              }
            }
          }
        },
        _count: {
          select: {
            likes: true,
            comments: true
          }
        }
      }
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update post
router.patch('/:id', auth, async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(req.params.id) }
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.authorId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const { title, content, imageUrl, tags } = req.body;

    const updatedPost = await prisma.post.update({
      where: { id: Number(req.params.id) },
      data: {
        title,
        content,
        imageUrl,
        tags: {
          set: [],
          connectOrCreate: tags.map(tag => ({
            where: { name: tag },
            create: { name: tag }
          }))
        }
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            profileImage: true
          }
        },
        tags: true
      }
    });

    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete post
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(req.params.id) }
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.authorId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await prisma.post.delete({
      where: { id: Number(req.params.id) }
    });

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Like/Unlike post
router.post('/:id/like', auth, async (req, res) => {
  try {
    const postId = Number(req.params.id);
    const userId = req.user.id;

    const existingLike = await prisma.like.findFirst({
      where: {
        postId,
        userId
      }
    });

    if (existingLike) {
      await prisma.like.delete({
        where: { id: existingLike.id }
      });
      res.json({ liked: false });
    } else {
      await prisma.like.create({
        data: {
          post: { connect: { id: postId } },
          user: { connect: { id: userId } }
        }
      });
      res.json({ liked: true });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add comment
router.post('/:id/comments', auth, async (req, res) => {
  try {
    const { content } = req.body;
    const comment = await prisma.comment.create({
      data: {
        content,
        post: { connect: { id: Number(req.params.id) } },
        author: { connect: { id: req.user.id } }
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            profileImage: true
          }
        }
      }
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
