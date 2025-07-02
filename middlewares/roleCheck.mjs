
import jwt from "jsonwebtoken";

import { JWT_SECRET } from '../utils/config.mjs';

export function ownerOrAdmin(req, res, next) {
  const token = req.cookies.token;


  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }


  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const targetUserId = req.params.id;
    
    const isSelf = decoded.id === targetUserId;
    const isAdmin = decoded.role === "admin";

    if (isSelf || isAdmin) {
      req.user = decoded; // Optionally attach the decoded user to the request
      return next();
    }

    return res.status(403).json({ message: "Forbidden: Access denied" });

  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}



export const isModer = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'No token provided.' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    // Only allow moderators or admins
    if (decoded.role !== 'moderator' && decoded.role !== "admin") {
      return res.status(403).json({ message: 'Access denied. Moderators or Admins only.' });
    }

    req.user = decoded;
    next();

  } catch (error) {
    console.error('Moderator check error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};


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

export function authCheck(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }


  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user info (id, role, etc.) to the request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
}