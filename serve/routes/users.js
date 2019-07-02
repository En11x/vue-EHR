var express = require("express");
var router = express.Router();
var Emp = require("../models/emp");

const zhenzismsClient = require("../zhenzisms/zhenzisms");

var client = new zhenzismsClient(
  "sms_developer.zhenzikj.com",
  "101941",
  "1830a898-1f5d-4794-b3fc-fbd63f82f20f"
);

// //发送短信
// var res = client.send('人力资源系统，验证码2244',13797957383,1)
// res.then(function(res){
//     console.log(res)
// })

//接收传过来的电话号码
let code;

router.post("/getCode", function(req, res) {
  var phone = parseInt(req.body.phone);
  //产生四位随机验证码
  code = Math.ceil(Math.random() * 10000);
  //发送短信
  var sendRes = client.send("EHR人力资源系统，验证码" + code, phone, phone++);
  sendRes.then(function(data) {
    res.send(data);
  });
});

router.post("/checkCode", function(req, res) {
  var userCode = parseInt(req.body.code);
  if (code === userCode) {
    let emp = new Emp({
      phone: req.body.phone
    });
    Emp.queryEmpByPhone(emp, (err, data) => {
      if (err) return res.send({ error: 403, message: "数据库异常!" });
      if (data.length) {
        res.send({ success: true, data: data[0] });
      } else {
        res.send({ error: 403, message: "账号不存在!" });
      }
    });
  } else {
    res.send({ error: 403, message: "验证码不正确!" });
  }
});

/* GET users listing. */
router.post("/checkLogin", function(req, res, next) {
  var userid = req.body.username;
  var password = req.body.password;
  let emp = new Emp({
    userid: userid
  });
  Emp.queryEmpByUserId(emp, (err, data) => {
    if (err) return res.send({ error: 403, message: "数据库异常！" });
    if (data.length) {
      if (data[0].password == password) {
        res.send({ success: true, data: data[0] });
      } else {
        res.send({ error: 403, message: "密码错误!" });
      }
    } else {
      res.send({ error: 403, message: "用户不存在!" });
    }
  });
});

module.exports = router;
