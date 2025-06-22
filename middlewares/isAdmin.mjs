import User from '../models/userModel.mjs'; // adjust path if needed
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';


export const isAdmin = async (req, res,next) => {
  try {

    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'No token provided.' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    // Add user info to request if needed
    req.user = decoded;
    next();

  } catch (error) {
    console.error('isAdmin check error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
