
const e = require('express');
const Account = require('../models/account')

class SiteControllers {
  // [GET] /
  home(req, res, next) {
    res.render("home")
  }

  // [GET] /detail/:slug
  detail(req, res, next) {
    res.render("detail")
  }
// get
  register(req, res, next) {
    res.render("register", { layout: false })
  }
   // [post] /register
   postRegister(req, res, next) {
    var newAccount = new Account(req.body);
    newAccount.save().then(() => {
      res.redirect("/login");
    });
  }
   // [GET] /login
   login(req, res, next) {
    res.render("login", {layout: false})
  }

   // [POST] /login
    postLogin(req, res, next) {
       Account.findOne({ email: req.body.email }).lean()
      .then( (user) => {
        if (!user) {
          res.render("login", {
            err: "Tài khoản này không tồn tại",
            layout: false,
          });
          return;
        }
  
        if (user.password != req.body.password) {
          res.render("login", { err: "Mật Khẩu Không Đúng", layout: false });
          return;
        }
  
        if (user.admin == true) {
          res.cookie("admin ", user.admin);
        }
        res.cookie("userId ", user._id);
        res.redirect(`/`)
      })
      .catch(next)
    }

}

module.exports = new SiteControllers();
