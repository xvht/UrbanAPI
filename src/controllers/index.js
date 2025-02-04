const scraper = require("../utils/scraper");
const { getYesterdayDate } = require("../utils/dateUtils");
const validateQueryParams = require("../utils/validateQueryParams");

async function searchController(req, res, next) {
  const {
    term,
    strict = "false",
    limit = "none",
    matchCase = "false",
    page = "1",
    multiPage = "false",
  } = req.query;

  if (!term) {
    return res.status(400).json({
      error: true,
      code: 400,
      data: "Term query parameter is required",
    });
  }

  const validationResult = validateQueryParams({
    term,
    strict,
    limit,
    matchCase,
    page,
    multiPage,
  });
  if (!validationResult.valid) {
    return res.status(400).json({
      error: true,
      code: 400,
      data: validationResult.message,
    });
  }

  const response = await scraper("define.php", {
    term,
    strict,
    limit,
    matchCase,
    page,
    multiPage,
  });

  if (response instanceof Error) return next(response);
  if (response.data && !response.data.length) {
    return res.status(404).json({
      error: false,
      code: 404,
      data: response,
    });
  }

  res.json({
    error: false,
    code: 200,
    data: response,
  });
}

async function randomController(req, res, next) {
  const {
    strict = "false",
    limit = "none",
    matchCase = "false",
    page = "1",
    multiPage = "false",
  } = req.query;

  const validationResult = validateQueryParams({
    strict,
    limit,
    matchCase,
    page,
    multiPage,
  });
  if (!validationResult.valid) {
    return res.status(400).json({
      error: true,
      code: 400,
      data: validationResult.message,
    });
  }

  const response = await scraper("random.php", {
    strict,
    limit,
    matchCase,
    page,
    multiPage,
  });

  if (response instanceof Error) return next(response);
  if (response.data && !response.data.length) {
    return res.status(404).json({
      error: false,
      code: 404,
      data: response,
    });
  }

  res.json({
    error: false,
    code: 200,
    data: response,
  });
}

async function browseController(req, res, next) {
  let character = req.query.character;
  const {
    strict = "false",
    limit = "none",
    matchCase = "false",
    page = "1",
    multiPage = "false",
  } = req.query;

  if (!character) {
    return res.status(400).json({
      error: false,
      code: 400,
      data: "Character query parameter is required",
    });
  }

  const validationResult = validateQueryParams({
    character,
    strict,
    limit,
    matchCase,
    page,
    multiPage,
  });
  if (!validationResult.valid) {
    return res.status(400).json({
      error: true,
      code: 400,
      data: validationResult.message,
    });
  }

  const scrapeType = "browse";
  const path = character === "new" ? "yesterday.php" : "browse.php";
  character = character === "new" ? getYesterdayDate() : character;

  const response = await scraper(path, {
    character,
    strict,
    limit,
    matchCase,
    scrapeType,
    page,
    multiPage,
  });

  if (response instanceof Error) return next(response);
  if (response.data && !response.data.length) {
    return res.status(404).json({
      error: false,
      code: 404,
      data: response,
    });
  }

  res.json({
    error: false,
    code: 200,
    data: response,
  });
}

async function authorController(req, res, next) {
  const {
    author,
    strict = "false",
    limit = "none",
    matchCase = "false",
    page = "1",
    multiPage = "false",
  } = req.query;

  if (!author) {
    return res.status(400).json({
      error: true,
      code: 400,
      data: "Author query parameter is required",
    });
  }

  const validationResult = validateQueryParams({
    author,
    strict,
    limit,
    matchCase,
    page,
    multiPage,
  });
  if (!validationResult.valid) {
    return res.status(400).json({
      error: true,
      code: 400,
      data: validationResult.message,
    });
  }

  const scrapeType = "author";
  const response = await scraper("author.php", {
    author,
    strict,
    limit,
    matchCase,
    scrapeType,
    page,
    multiPage,
  });

  if (response instanceof Error) return next(response);
  if (response.data && !response.data.length) {
    return res.status(404).json({
      error: false,
      code: 404,
      data: response,
    });
  }

  res.json({
    error: false,
    code: 200,
    data: response,
  });
}

async function dateController(req, res, next) {
  const {
    date,
    strict = "false",
    limit = "none",
    matchCase = "false",
    page = "1",
    multiPage = "false",
  } = req.query;

  if (!date) {
    return res.status(400).json({
      error: false,
      code: 400,
      data: "Date query parameter is required",
    });
  }

  const validationResult = validateQueryParams({
    date,
    strict,
    limit,
    matchCase,
    page,
    multiPage,
  });
  if (!validationResult.valid) {
    return res.status(400).json({
      error: true,
      code: 400,
      data: validationResult.message,
    });
  }

  const scrapeType = "date";
  const response = await scraper("yesterday.php", {
    date,
    strict,
    limit,
    matchCase,
    scrapeType,
    page,
    multiPage,
  });

  if (response instanceof Error) return next(response);
  if (response.data && !response.data.length) {
    return res.status(404).json({
      error: false,
      code: 404,
      data: response,
    });
  }

  res.json({
    error: false,
    code: 200,
    data: response,
  });
}

module.exports = {
  searchController,
  randomController,
  browseController,
  authorController,
  dateController,
};
