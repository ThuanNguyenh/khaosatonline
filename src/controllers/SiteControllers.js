const Account = require("../models/account");
const Field = require("../models/field");
const Tittle = require("../models/tittle");
const Question = require("../models/question");
const Response = require("../models/response");
const response = require("../models/response");

class SiteControllers {
  // [GET] /
  home(req, res, next) {
    let fields = Field.find().lean();
    let tittles = Tittle.find().lean();

    Promise.all([fields, tittles])
      .then(([field, tittle]) => {
        res.render("home", { tittle });
      })
      .catch(next);
  }

  // [GET] /detail/:id
  detail(req, res, next) {
    let questions = Question.find({ idTittle: req.params.id }).lean();
    let tittles = Tittle.find({ _id: req.params.id }).lean();

    Promise.all([questions, tittles])
      .then(([question, tittle]) => {
        // console.log(question)
        var heading = tittle[0].tittle;
        var id = tittle[0]._id;
        res.render("detail", {
          question,
          heading,
          id,
        });
      })
      .catch(next);
  }

  // [PATCH] /submit/:id
  submit(req, res, next) {
    var newResponse = new Response(req.body);
    // newAnswer.idUser = "123"
    newResponse.res = req.body;
    newResponse.save().then(() => {
      console.log(newResponse);
      res.redirect("back");
    });
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

  // [GET] /register
  register(req, res, next) {
    res.render("register", { layout: false });
  }

  // [POST] /post/login
  postLogin(req, res, next) {
    // console.log(req.body)
    Account.findOne({ email: req.body.email })
      .lean()
      .then((user) => {
        console.log(user)
        if (!user) {
          res.render("login", {
            err: "Tài khoản này không tồn tại vui lòng nhập lại",
            layout: false,
          });
          return;
        }

        if (user.password != req.body.password) {
          res.render("login", { err: "Mật khẩu không đúng vui lòng nhập lại", layout: false });
          return;
        }

        if (user.admin == true) {
          res.cookie("admin ", user.admin);
        }
        res.cookie("userId", user._id);
        res.redirect(`/`);
      })
      .catch(next);
  }
}

module.exports = new SiteControllers();
