const express = require('express');
const { auth } = require('../middleware/auth');
const prisma = require('../config/db');

const router = express.Router();

// Follow user
router.post('/follow/:id', auth, async (req, res) => {
  try {
    const followingId = Number(req.params.id);
    const followerId = req.user.id;

    if (followerId === followingId) {
      return res.status(400).json({ error: 'Cannot follow yourself' });
    }

    const existingFollow = await prisma.follow.findFirst({
      where: {
        followerId,
        followingId
      }
    });

    if (existingFollow) {
      return res.status(400).json({ error: 'Already following this user' });
    }

    await prisma.follow.create({
      data: {
        follower: { connect: { id: followerId } },
        following: { connect: { id: followingId } }
      }
    });

    res.json({ message: 'Successfully followed user' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Unfollow user
router.post('/unfollow/:id', auth, async (req, res) => {
  try {
    const followingId = Number(req.params.id);
    const followerId = req.user.id;

    const follow = await prisma.follow.findFirst({
      where: {
        followerId,
        followingId
      }
    });

    if (!follow) {
      return res.status(400).json({ error: 'Not following this user' });
    }

    await prisma.follow.delete({
      where: { id: follow.id }
    });

    res.json({ message: 'Successfully unfollowed user' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get user's followers
router.get('/:id/followers', async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const followers = await prisma.follow.findMany({
      where: { followingId: userId },
      include: {
        follower: {
          select: {
            id: true,
            name: true,
            profileImage: true,
            bio: true
          }
        }
      }
    });

    res.json(followers.map(f => f.follower));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get user's following
router.get('/:id/following', async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const following = await prisma.follow.findMany({
      where: { followerId: userId },
      include: {
        following: {
          select: {
            id: true,
            name: true,
            profileImage: true,
            bio: true
          }
        }
      }
    });

    res.json(following.map(f => f.following));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get user's feed (posts from followed users)
router.get('/feed', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const following = await prisma.follow.findMany({
      where: { followerId: req.user.id },
      select: { followingId: true }
    });

    const followingIds = following.map(f => f.followingId);

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where: {
          authorId: { in: followingIds },
          published: true
        },
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
      prisma.post.count({
        where: {
          authorId: { in: followingIds },
          published: true
        }
      })
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

module.exports = router;
