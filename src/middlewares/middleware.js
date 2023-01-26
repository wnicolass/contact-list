exports.globalMiddleware = (req, res, next) => {
  res.locals.errors = req.flash("errors");
  res.locals.success = req.flash("success");
  res.locals.user = req.session.user;
  res.locals.url = req.originalUrl;
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

exports.loginRequired = (req, res, next) => {
  if (!req.session.user) {
    req.flash("errors", "You must be logged in.");
    req.session.save(() => res.redirect("/"));
    return;
  }

  next();
};

exports.serverError = (error, req, res, next) => {
  console.error(error);
  res.status(500).render("500");
};

exports.inexistingRoutes = (req, res) => {
  res.status(404).render("404");
};
