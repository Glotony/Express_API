

const getClientIp = (req) => {
  const forwarded = req.headers['x-forwarded-for'];

  let ip = typeof forwarded === 'string'
    ? forwarded.split(',')[0].trim()
    : req.socket.remoteAddress || req.connection.remoteAddress || 'unknown';
    


  if (ip === '::1' || ip === '::ffff:127.0.0.1') {
    ip = '127.0.0.1';
  }

  return ip;
};

export default getClientIp