//ehr_rule
var express = require("express");
var router = express.Router();
var Rule = require("../models/rule");

//获取全部信息
router.get("/queryRule", function(req, res) {
  Rule.queryRule((err, data) => {
    if (err) return res.send({ error: 403, message: "数据库异常！" });
    res.send(data);
  });
});

//增加
router.post("/addRule", function(req, res) {

  let rule = new Rule({
    id: req.body.id ? parseInt(req.body.id) : null,
    rulesName: req.body.rulesName,
    clockInNum: req.body.clockInNum ? parseInt(req.body.clockInNum) : null,
    amStartTime: req.body.amStartTime,
    amEndTime: req.body.amEndTime,
    pmStartTime: req.body.pmStartTime,
    pmEndTime: req.body.pmEndTime,
    clockInIocation: req.body.clockInIocation,
    instructions: req.body.instructions ? parseInt(req.body.instructions) : null,
    empId: req.body.empId,
    empName: req.body.empName
  });
  console.log(rule)
  Rule.addRule(rule, function(err, data) {
    if (err) return res.send({ error: 403, message: "编辑失败!" });
    res.send({ success: true });
  });
});

//更新Rule全部信息
router.post("/updateRule", function(req, res) {
  let rule = new Rule({
    id: req.body.id ? parseInt(req.body.id) : null,
    rulesName: req.body.rulesName,
    clockInNum: req.body.clockInNum ? parseInt(req.body.clockInNum) : null,
    amStartTime: req.body.amStartTime,
    amEndTime: req.body.amEndTime,
    pmStartTime: req.body.pmStartTime,
    pmEndTime: req.body.pmEndTime,
    clockInIocation: req.body.clockInIocation,
    instructions: req.body.instructions ? parseInt(req.body.instructions) : null,
    empId: req.body.empId,
    empName: req.body.empName
  });

  Rule.updateRule(rule, function(err, data) {
    if (err) return res.send({ error: 403, message: "编辑失败!" });
    res.send({ success: true });
  });
});

//删除Rule全部信息
router.post("/deleteRule", function(req, res) {
  var ids = req.body.ids;
  Rule.deleteRule(ids, function(err, data) {
    if (err) return res.send({ error: 403, message: "删除失败!" });
    res.send({ success: true });
  });
});

module.exports = router;
