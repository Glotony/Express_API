import dotenv from 'dotenv';
dotenv.config();


import getClientIp from "./getIP.mjs"


const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
  : [];


export default function originCheck(req, res, next) {
  const origin = req.headers.origin;
  const referer = req.headers.referer;
  const ip = getClientIp(req);


  // Allow the request if either origin or referer is present
  if (!origin && !referer && !ip) {
    console.warn("❌ Blocked");
    return 
  }

  // If origin is present, check if it's in the allowed origins
  if (origin && !allowedOrigins.includes(origin)) {
    console.warn("❌ Blocked", origin);
    return 
  }

  // If origin is present, check if it's in the allowed origins
  if (referer && !allowedOrigins.includes(referer)) {
    console.warn("❌ Blocked", referer);
    return 
  }

  next(); // Call next to pass the request to the next middleware
}
