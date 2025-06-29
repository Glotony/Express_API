import User from '../models/userModel.mjs'; // adjust path if needed
import jwt from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
// დააექსპორტე როგორც isModer
export const isModer = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'No token provided.' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.role !== 'moderator' || decoded.role !== "admin") {
      return res.status(403).json({ message: 'Access denied. Modders only.' });
    }

    req.user = decoded;
    next();

  } catch (error) {
    console.error('moderator check error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
