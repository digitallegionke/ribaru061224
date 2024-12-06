const { validationResult, body } = require('express-validator');

const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  };
};

// User validation rules
const userValidation = {
  register: [
    body('email').isEmail().normalizeEmail().withMessage('Invalid email address'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long')
      .matches(/\d/)
      .withMessage('Password must contain a number'),
    body('name').trim().notEmpty().withMessage('Name is required')
  ],
  login: [
    body('email').isEmail().normalizeEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  updateProfile: [
    body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
    body('bio').optional().trim().isLength({ max: 500 }).withMessage('Bio must be less than 500 characters'),
    body('profileImage').optional().isURL().withMessage('Invalid image URL')
  ]
};

// Post validation rules
const postValidation = {
  create: [
    body('title').trim().notEmpty().withMessage('Title is required')
      .isLength({ max: 200 }).withMessage('Title must be less than 200 characters'),
    body('content').trim().notEmpty().withMessage('Content is required'),
    body('imageUrl').optional().isURL().withMessage('Invalid image URL'),
    body('tags').optional().isArray().withMessage('Tags must be an array')
      .custom((tags) => tags.every(tag => typeof tag === 'string'))
      .withMessage('Tags must be strings')
  ],
  comment: [
    body('content').trim().notEmpty().withMessage('Comment content is required')
      .isLength({ max: 1000 }).withMessage('Comment must be less than 1000 characters')
  ]
};

module.exports = {
  validate,
  userValidation,
  postValidation
};
