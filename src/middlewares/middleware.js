exports.globalMiddleware = (req, res, next) => {
  next();
};

exports.checkCSRFError = (err, req, res, next) => {
  if (err) {
    return res.render("404");
  }

  next();
};

exports.tokenInjection = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};
