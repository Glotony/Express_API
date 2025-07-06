import rateLimit from 'express-rate-limit';
import NodeCache from 'node-cache';
import getClientIp from "./getIP.mjs"

const ipCache = new NodeCache({ stdTTL: 900 }); // cache per IP for 15 minutes

const whitelistedIps = new Set([
  ...(process.env.MY_WHITELISTED_IPS?.split(',') || []),
]);


export default rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: (req) => {
    const ip = getClientIp(req);

    // Immediately allow high limits for whitelisted IPs
    if (whitelistedIps.has(ip)) return 100;

    // Track IP hits using NodeCache
    const hits = ipCache.get(ip) || 0;
    ipCache.set(ip, hits + 1);

    return 5; // strict: 5 requests per minute for others
  },
  keyGenerator: getClientIp,
  skipSuccessfulRequests: false,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    const ip = getClientIp(req);
    const hitCount = ipCache.get(ip) || 0;

    res.status(429).json({
      error: true,
      message: '🚫 Too many requests. Please wait and try again.',
      ip,
      hits: hitCount
    });
  }
});
