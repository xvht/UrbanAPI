const apiKeyMiddleware = (req, res, next) => {
  try {
    let apiKey = req.headers.authorization;
    if (!apiKey) {
      return res.status(401).json({
        error: true,
        code: 401,
        data: "API key is required",
      });
    }

    [, apiKey] = apiKey.split(" ");
    if (apiKey !== process.env.API_KEY) {
      return res.status(401).json({
        error: true,
        code: 401,
        data: "Invalid API key",
      });
    }

    next();
  } catch (error) {
    res.status(401).json({
      error: true,
      code: 401,
      data: "Invalid API key",
    });
  }
};

module.exports = apiKeyMiddleware;
