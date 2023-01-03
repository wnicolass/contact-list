exports.globalMiddleware = (req, res, next) => {
  next();
};

exports.checkCSRFError = (err, req, res, next) => {
  if (err && err.code === "EBADCSRFTOKEN") {
    return res.render("404");
  }
};

exports.tokenInjection = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};
