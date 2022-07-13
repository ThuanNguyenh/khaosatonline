let Account = require("../models/account")

class authentication {

  async getUser(req, res, next) {
    if (req.cookies.userId) {
      await Account.findById({ _id: req.cookies.userId })
      .then((user) => {
          if (user) {
              res.locals.userId = user._id
              res.locals.avatar = user.avatar;
              res.locals.userName= user.userName;
              res.locals.slug = user.slug;
            }
      });
    }
    next();
  }
  
  checkUser(req, res, next) {
    if(! req.cookies.userId) {
        res.redirect("/login")
    }  else {
        next();
    }
  }
}
module.exports = new authentication();