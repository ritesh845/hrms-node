const jwt = require('jsonwebtoken');

module.exports = function tokenVerify(req, res, next) {
    var token = req.headers.authorization;
    try {
        jwt.verify(token, 'secrettext', function(err, decoded) {
            if (err) {
                return res.status(401).json({ status: "error", code: 401, message: "Unauthorized", data: {} });
            } else {
                next();
            }
        });

    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
}