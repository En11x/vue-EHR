//ehr_Talent 员工薪资表
var express = require("express");
var router = express.Router();
var Talent = require("../models/talent");

//获取全部信息
router.get("/queryTalent", function(req, res) {
  Talent.queryTalent((err, data) => {
    if (err) return res.send({ error: 403, message: "数据库异常！" });
    res.send(data);
  });
});

//增加
router.post("/addTalent", function(req, res) {
  let talent = new Talent({
    id: req.body.id ? parseInt(req.body.id) : null,
    name: req.body.name,
    sex: req.body.sex,
    phone: req.body.phone,
    QQ: req.body.QQ,
    email: req.body.email,
    age: req.body.age,
    currentAddress: req.body.currentAddress,
    specialty: req.body.specialty,
    comments: req.body.comments,
    asTheCompany: req.body.asTheCompany,
    mark: req.body.mark
  });
  Talent.addTalent(talent, function(err, data) {
    if (err) return res.send({ error: 403, message: "编辑失败!" });
    res.send({ success: true });
  });
});

//更新Talent全部信息
router.post("/updateTalent", function(req, res) {
  let talent = new Talent({
    id: parseInt(req.body.id),
    name: req.body.name,
    sex: parseInt(req.body.sex),
    phone: req.body.phone,
    QQ: req.body.QQ,
    email: req.body.email,
    age: parseInt(req.body.age),
    currentAddress: req.body.currentAddress,
    specialty: req.body.specialty,
    comments: req.body.comments,
    asTheCompany: req.body.asTheCompany,
    mark: req.body.mark
  });

  Talent.updateTalent(talent, function(err, data) {
    if (err) return res.send({ error: 403, message: "编辑失败!" });
    res.send({ success: true });
  });
});

//删除Talent全部信息
router.post("/deleteTalent", function(req, res) {
  var ids = req.body.ids;
  Talent.deleteTalent(ids, function(err, data) {
    if (err) return res.send({ error: 403, message: "删除失败!" });
    res.send({ success: true });
  });
});

module.exports = router;
