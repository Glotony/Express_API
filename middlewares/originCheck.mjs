import dotenv from 'dotenv';
dotenv.config();

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
  : [];

export function originCheck(req, res, next) {
  const origin = req.headers.origin;

  if (!origin) {
    // No origin header (e.g., curl or same-origin request) — allow it
    return next();
  }

  if (allowedOrigins.includes(origin)) {
    return next();
  }

  res.status(403).json({ message: 'Origin not allowed by CORS' });
}
