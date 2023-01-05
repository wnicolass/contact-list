exports.globalMiddleware = (req, res, next) => {
  res.locals.errors = req.flash("errors");
  res.locals.success = req.flash("success");
  res.locals.user = req.session.user;
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
