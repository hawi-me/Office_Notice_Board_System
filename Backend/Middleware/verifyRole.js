const jwt = require('jsonwebtoken');
const user = require('../Models/userModel');
const verfiyRole = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Access denied no token provided' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await user.findById(decoded.id);
        if (req.user.role !== 'admin') {
            return res.status(401).json({ message: 'Access denied you are not an admin' });
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
module.exports = verfiyRole;