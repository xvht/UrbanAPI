const path = require("path");

const {
  searchController,
  randomController,
  browseController,
  authorController,
  dateController,
} = require("../controllers");
const apiKeyMiddleware = require("../middlewares/auth");

function setupRoutes(app) {
  app.use(apiKeyMiddleware);

  app.use("/api/search", searchController);
  app.use("/api/random", randomController);
  app.use("/api/browse", browseController);
  app.use("/api/author", authorController);
  app.use("/api/date", dateController);

  app.all("*", (req, res) => {
    return res.status(400).json(badRequestResponse("Invalid endpoint"));
  });
}

module.exports = setupRoutes;
