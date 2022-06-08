const addHeaders = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://markdownonsteroids.netlify.app');
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, DELETE, PATCH, OPTIONS'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Content-Length, X-Requested-With'
  );
  res.header('Access-Control-Allow-Credentials', true);
  next();
};

module.exports = addHeaders;
