const {
  searchController,
  randomController,
  browseController,
  authorController,
  dateController,
} = require("../controllers");
const apiKeyMiddleware = require("../middlewares/auth");
const { successResponse, badRequestResponse } = require("../responses");

function setupRoutes(app) {
  app.get("/v1/health", (req, res) => {
    return res.json(successResponse("API is healthy"));
  });

  app.use(apiKeyMiddleware);
  app.use("/v1/search", searchController);
  app.use("/v1/random", randomController);
  app.use("/v1/browse", browseController);
  app.use("/v1/author", authorController);
  app.use("/v1/date", dateController);

  app.all("*", (req, res) => {
    return res.status(400).json(badRequestResponse("Invalid endpoint"));
  });
}

module.exports = setupRoutes;
