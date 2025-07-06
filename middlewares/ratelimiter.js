
import rateLimit from 'express-rate-limit';
import NodeCache from 'node-cache';

const ipCache = new NodeCache({ stdTTL: 900 }); // 15 min cache per IP

export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  keyGenerator: (req) => {
    const ip = req.ip;
    const hits = ipCache.get(ip) || 0;
    ipCache.set(ip, hits + 1);
    return ip;
  },
  handler: (req, res) => {
    res.status(429).json({ message: 'Too many requests, please try again later.' });
  }
});