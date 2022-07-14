const Account = require("../models/account");
const Field = require("../models/field");
const Tittle = require("../models/tittle");
const Question = require("../models/question");
const Response = require("../models/response");
const response = require("../models/response");

class SiteControllers {
  // [GET] /
  home(req, res, next) {
    let tittles = Tittle.find().lean();
    let account = Account.find({ _id: req.cookies.userId }).lean();
    Promise.all([tittles, account])
      .then(([tittle, user]) => {
        res.render("home", { tittle, user });
      })
      .catch(next);
  }

  // [GET] /detail/:id
  detail(req, res, next) {
    let userId = req.cookies.userId;
    let questions = Question.find({ idTittle: req.params.id }).lean();
    let tittles = Tittle.find({ _id: req.params.id }).lean();

    Promise.all([questions, tittles])
      .then(([question, tittle]) => {
        var heading = tittle[0].tittle;
        var idTittle = tittle[0]._id;
        if (userId) {
          res.render("detail", {
            question,
            heading,
            userId,
            idTittle,
          });
        } else {
          res.redirect("/login");
        }
      })
      .catch(next);
  }

  // [PATCH] /submit/:id
  submit(req, res, next) {
    var newResponse = new Response(req.body);
    newResponse.res = req.body;
    
    // var lengNewRes = newResponse.question.length;
    // var group = {};
    // for (var i = 0; i < lengNewRes; i++) {
    //   group[newResponse.question[0]] = newResponse.res.cau1;
    //   group[newResponse.question[1]] = newResponse.res.cau2;
    //   group[newResponse.question[2]] = newResponse.res.cau3;
    // }
    // newResponse.ans = group

    newResponse.save().
    then
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
        if (!user) {
          res.render("login", {
            err: "Tài khoản này không tồn tại vui lòng nhập lại",
            layout: false,
          });
          return;
        }

        if (user.password != req.body.password) {
          res.render("login", {
            err: "Mật khẩu không đúng vui lòng nhập lại",
            layout: false,
          });
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

  // [POST] /post/register
  postRegister(req, res, next) {
    let newAccount = new Account(req.body);
    newAccount
      .save()
      .then(() => {
        res.redirect("/login");
      })
      .catch(next);
  }

  // [GET] /logout
  logout(req, res, next) {
    res.clearCookie("userId");
    res.redirect("/login");
  }

  // [GET] /create/question/:slug
  createQuestion(req, res, next) {
    console.log(req.params);
    Tittle.find()
      .lean()
      .then((tittle) => {
        // console.log("title: ",tittle)
        // console.log("field: ", tittle[0].field)
        res.render("createQuestion", { tittle });
      });
  }

  // [POST] /post/tittle
  postTittle(req, res, next) {
    // console.log(req.body)
    let newTittle = new Tittle(req.body);
    newTittle
      .save()
      .then(() => {
        // console.log(newTittle)
        res.redirect(`/create/question/${newTittle.slug}`);
      })
      .catch(next);
  }
}

module.exports = new SiteControllers();
