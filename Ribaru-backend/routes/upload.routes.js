const express = require('express');
const { auth } = require('../middleware/auth');
const upload = require('../middleware/upload');
const cloudinary = require('../config/cloudinary');
const router = express.Router();

// Upload single image
router.post('/image', auth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Please upload a file' });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'ribaru',
      use_filename: true
    });

    res.json({
      url: result.secure_url,
      public_id: result.public_id
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete image from cloudinary
router.delete('/image/:public_id', auth, async (req, res) => {
  try {
    const result = await cloudinary.uploader.destroy(req.params.public_id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
