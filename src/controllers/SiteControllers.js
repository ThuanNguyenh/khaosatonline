const Account = require("../models/account");
const Field = require("../models/field");
const Tittle = require("../models/tittle");
const Question = require("../models/question");
const tittle = require("../models/tittle");


class SiteControllers {
  // [GET] /
  home(req, res, next) {
    let fields = Field.find().lean()
    let tittles = Tittle.find().lean()

    Promise.all([fields, tittles])
    .then(([field, tittle]) => {
      res.render("home", {tittle})

    })
    .catch(next)

  }

  // [GET] /detail/:id
  detail(req, res, next) {
    let questions = Question.find({idTittle: req.params.id}).lean()
    let tittles = Tittle.find({_id: req.params.id}).lean()

    Promise.all([questions, tittles])
    .then(([question, tittle]) => {
      var tieude = tittle[0].tittle
      var id = tittle[0]._id
      res.render("detail", {
        question,
        tieude ,
        id
      })
    })
    .catch(next)
  }

  // [PATCH] /submit/:id
  submit(req, res, next) {
    console.log(req.body)
    res.redirect("/")
  }

  // get
  register(req, res, next) {
    res.render("register", { layout: false });
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
    res.render("login", { layout: false });
  }

  // [POST] /login
  postLogin(req, res, next) {
    Account.findOne({ email: req.body.email })
      .lean()
      .then((user) => {
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
        res.redirect(`/`);
      })
      .catch(next);
  }
}

module.exports = new SiteControllers();
