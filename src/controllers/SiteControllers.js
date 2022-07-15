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
    let tittles = Tittle.findOne({ _id: req.params.id }).lean();

    Promise.all([questions, tittles])
      .then(([question, tittle]) => {
        // console.log(tittle)
        // console.log(question)
        if (userId) {
          res.render("detail", {
            question,
            userId,
            tittle
          });
        } else {
          res.redirect("/login");
        }
      })
      .catch(next);
  }

  // [GET] /res/:idQuestion
  myAnswer(req, res, next) {
    // console.log(req.params)
    let findMe = Account.findOne({ _id: req.cookies.userId }).lean();
    let findAns = Response.findOne({ _id: req.params.id }).lean();
    let findAllAns =  Response.find({ _id: req.params.id }).lean()
    
    Promise.all([findMe, findAns, findAllAns])
    .then(([me, answer, allAnswer]) => {
      // console.log(allAnswer)
      

      var lengNewRes = answer.question.length;
      var group = {};
      for (var i = 0; i < lengNewRes; i++) {
        group[answer.question[0]] = answer.res.cau1;
        group[answer.question[1]] = answer.res.cau2;
        group[answer.question[2]] = answer.res.cau3;
      }

      // allAnswer.reduce((countCau1, answer) => {
      //   let arrCau1 = allAnswer.filter((e) => e.res.cau1 == answer.res.cau1)
      //   console.log("arr: ", arrCau1.length)
      // }, [])

      // console.log("gr: ", group)
      res.render("res", { me, answer, group });
    })
    .catch(next)
  }

  // [PATCH] /submit/:id
  submit(req, res, next) {
    var newResponse = new Response(req.body);
    newResponse.res = req.body;
    // console.log(newResponse)
    newResponse.save().then(() => {
      // res.send(newResponse)
      res.redirect(`/res/${newResponse._id}`);
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
    Tittle.findOne({ _id: req.params.id })
      .lean()
      .then((tittle) => {
        // console.log(tittle)
        res.render("createQuestion", { tittle });
      })
      .catch(next);
  }

  // [POST] /post/tittle
  postTittle(req, res, next) {
    // console.log(req.body)
    let newTittle = new Tittle(req.body);
    newTittle
      .save()
      .then(() => {
        // console.log(newTittle)
        res.redirect(`/create/question/${newTittle._id}`);
      })
      .catch(next);
  }
}

module.exports = new SiteControllers();
