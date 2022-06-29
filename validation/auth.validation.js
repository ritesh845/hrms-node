const { check, validationResult } = require('express-validator');

exports.loginValidation = [
    check('email', 'Please include a valid email')
    .isEmail().
    normalizeEmail({ gmail_remove_dots: true }),
    check('password', 'Password must be 6 or more characters')
    .isLength({ min: 6 }),
    async(req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: "error", code: 400, message: "Validator Error", data: errors.array() });
        }
        next();
    },
]


exports.registerValidation = [
    check('name', 'Name is requied')
    .not().
    isEmpty(),
    check('email', 'Please include a valid email')
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: true }),
    check('password', 'Password must be 6 or more characters')
    .isLength({ min: 6 }),
    async(req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: "error", code: 400, message: "Validator Error", data: errors.array() });
        }
        next();
    },
];