//ehr_Release
var express = require("express");
var router = express.Router();
var Release = require("../models/release");

//获取全部信息
router.get("/queryRelease", function(req, res) {
  Release.queryRelease((err, data) => {
    if (err) return res.send({ error: 403, message: "数据库异常！" });
    res.send(data);
  });
});

//增加
router.post("/addRelease", function(req, res) {
    
  let release = new Release({
    id: req.body.id ? parseInt(req.body.id) : null,
    skillsRequired: req.body.skillsRequired,
    hiring: req.body.hiring ? parseInt(req.body.hiring) : null,
    wageBudget: req.body.wageBudget ? parseInt(req.body.wageBudget) : null, 
    initiateTime: req.body.initiateTime,
    state:req.body.state,
    mark: req.body.mark,
    empId: req.body.empId,
    empName: req.body.empName,
    channelId:req.body.channelId
  });
  
  Release.addRelease(release, function(err, data) {
    if (err) return res.send({ error: 403, message: "编辑失败!" });
    res.send({ success: true });
  });
});

//更新Release全部信息
router.post("/updateRelease", function(req, res) {
  let release = new Release({
    id: req.body.id ? parseInt(req.body.id) : null,
    skillsRequired: req.body.skillsRequired,
    hiring: req.body.hiring ? parseInt(req.body.hiring) : null,
    wageBudget: req.body.wageBudget ? parseInt(req.body.wageBudget) : null, 
    initiateTime: req.body.initiateTime,
    state: req.body.state,
    mark: req.body.mark,
    empId: req.body.empId,
    empName: req.body.empName,
    channelId:req.body.channelId,
    logicToDelete:req.body.logicToDelete,
  });
  
  Release.updateRelease(release, function(err, data) {
    if (err) return res.send({ error: 403, message: "编辑失败!" });
    res.send({ success: true });
  });
});

//删除Release全部信息
router.post("/deleteRelease", function(req, res) {
  var ids = req.body.ids;
  Release.deleteRelease(ids, function(err, data) {
    if (err) return res.send({ error: 403, message: "删除失败!" });
    res.send({ success: true });
  });
});

module.exports = router;
