var express = require("express");
var router = express.Router();
var Wage = require("../models/wage");

//获取全部信息
router.get("/queryWage", function(req, res) {
  Wage.queryWage((err, data) => {
    if (err) return res.send({ error: 403, message: "数据库异常！" });
    res.send(data);
  });
});

//增加
router.post("/addWage", function(req, res) {
  let wage = new Wage({
    id: req.body.id ? parseInt(req.body.id) : null,
    empId: wage.empId,
    empName: wage.empName,
    shouldSend: req.body.shouldSend ? parseInt(req.body.shouldSend) : null,
    bonus: req.body.bonus ? parseInt(req.body.bonus) : null,
    fine: req.body.fine ? parseInt(req.body.fine) : null,
    insured: req.body.insured ? parseInt(req.body.insured) : null,
    time: wage.time,
    realHair: req.body.realHair ? parseInt(req.body.realHair) : null
  });
  Wage.addWage(wage, function(err, data) {
    if (err) return res.send({ error: 403, message: "编辑失败!" });
    res.send({ success: true });
  });
});

//更新Wage全部信息
router.post("/updateWage", function(req, res) {
  let wage = new Wage({
    id: req.body.id ? parseInt(req.body.id) : null,
    empId: wage.empId,
    empName: wage.empName,
    shouldSend: req.body.shouldSend ? parseInt(req.body.shouldSend) : null,
    bonus: req.body.bonus ? parseInt(req.body.bonus) : null,
    fine: req.body.fine ? parseInt(req.body.fine) : null,
    insured: req.body.insured ? parseInt(req.body.insured) : null,
    time: wage.time,
    realHair: req.body.realHair ? parseInt(req.body.realHair) : null
   });

  Wage.updateWage(wage, function(err, data) {
    if (err) return res.send({ error: 403, message: "编辑失败!" });
    res.send({ success: true });
  });
});

//删除Wage全部信息
router.post("/deleteWage", function(req, res) {
  var ids = req.body.ids;
  Wage.deleteWage(ids, function(err, data) {
    if (err) return res.send({ error: 403, message: "删除失败!" });
    res.send({ success: true });
  });
});

module.exports = router;
