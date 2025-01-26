const path = require("path");

const {
  searchController,
  randomController,
  browseController,
  authorController,
  dateController,
} = require("../controllers");
const apiKeyMiddleware = require("../middlewares/auth");
const responses = require("../responses");

function setupRoutes(app) {
  app.get("/v1/health", (req, res) => {
    return res.json(responses.successResponse("API is healthy"));
  });

  app.use(apiKeyMiddleware);
  app.use("/v1/api/search", searchController);
  app.use("/v1/api/random", randomController);
  app.use("/v1/api/browse", browseController);
  app.use("/v1/api/author", authorController);
  app.use("/v1/api/date", dateController);

  app.all("*", (req, res) => {
    return res.status(400).json(badRequestResponse("Invalid endpoint"));
  });
}

module.exports = setupRoutes;
