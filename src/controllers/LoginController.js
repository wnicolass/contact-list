const Login = require("../models/LoginModel");

exports.index = (req, res) => {
  if (req.session.user) {
    return res.render("authenticated");
  }
  return res.render("login");
};

exports.signUp = (req, res) => {
  return res.render("sign-up");
};

exports.register = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.register();

    if (login.errors.length > 0) {
      req.flash("errors", login.errors);
      req.session.save(() => {
        return res.redirect("back");
      });
      return;
    }

    req.flash("success", "Your user has been successfully registered.");
    req.session.save(() => {
      return res.redirect("back");
    });
  } catch (e) {
    console.log(e);
    return res.render("404");
  }
};

exports.signIn = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.signin();

    if (login.errors.length > 0) {
      req.flash("errors", login.errors);
      req.session.save(() => {
        return res.redirect("back");
      });
      return;
    }

    req.flash("success", "You are logged in.");
    req.session.user = login.user;
    req.session.save(() => {
      return res.redirect("back");
    });
  } catch (e) {
    console.log(e);
    return res.render("404");
  }
};

exports.signOut = (req, res) => {
  req.session.destroy();
  res.redirect("/login/index");
};
