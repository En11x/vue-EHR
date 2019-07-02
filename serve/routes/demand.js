//ehr_Demand
var express = require("express");
var router = express.Router();
var Demand = require("../models/demand");

//获取全部信息
router.get("/queryDemand", function(req, res) {
  Demand.queryDemand((err, data) => {
    if (err) return res.send({ error: 403, message: "数据库异常！" });
    res.send(data);
  });
});

//增加
router.post("/addDemand", function(req, res) {
    
  let demand = new Demand({
    id: req.body.id ? parseInt(req.body.id) : null,
    skillsRequired: req.body.skillsRequired,
    hiring: req.body.hiring ? parseInt(req.body.hiring) : null,
    wageBudget: req.body.wageBudget ? parseInt(req.body.wageBudget) : null, 
    initiateTime: req.body.initiateTime,
    state: req.body.state ? parseInt(req.body.state) : null,
    mark: req.body.mark,
    empId: req.body.empId,
    empName: req.body.empName
  });
  
  Demand.addDemand(demand, function(err, data) {
    if (err) return res.send({ error: 403, message: "编辑失败!" });
    res.send({ success: true });
  });
});

//更新Demand全部信息
router.post("/updateDemand", function(req, res) {
  let demand = new Demand({
    id: req.body.id ? parseInt(req.body.id) : null,
    skillsRequired: req.body.skillsRequired,
    hiring: req.body.hiring ? parseInt(req.body.hiring) : null,
    wageBudget: req.body.wageBudget ? parseInt(req.body.wageBudget) : null, 
    initiateTime: req.body.initiateTime,
    state: req.body.state ? parseInt(req.body.state) : null,
    mark: req.body.mark,
    empId: req.body.empId,
    empName: req.body.empName
  });

  Demand.updateDemand(demand, function(err, data) {
    if (err) return res.send({ error: 403, message: "编辑失败!" });
    res.send({ success: true });
  });
});

//删除Demand全部信息
router.post("/deleteDemand", function(req, res) {
  var ids = req.body.ids;
  Demand.deleteDemand(ids, function(err, data) {
    if (err) return res.send({ error: 403, message: "删除失败!" });
    res.send({ success: true });
  });
});

module.exports = router;
