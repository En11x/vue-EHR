var express = require("express");
var router = express.Router();
var Activity = require("../models/activity");

//获取全部信息
router.get("/queryActivity", function(req, res) {
  Activity.queryActivity((err, data) => {
    if (err) return res.send({ error: 403, message: "数据库异常！" });
    res.send(data);
  });
});

//增加
router.post("/addActivity", function(req, res) {
  let activity = new Activity({
    id: req.body.id ? parseInt(req.body.id) : null,
    theme: req.body.theme,
    activityAddress: req.body.activityAddress,
    introduce: req.body.introduce,
    activityTheDetail: req.body.activityTheDetail,
    initateTime: req.body.initateTime,
    spending: req.body.spending ? parseInt(req.body.spending) : null,
    state: req.body.state? parseInt(req.body.state) : null,
    empName: req.body.empName
  });
  Activity.addActivity(activity, function(err, data) {
    if (err) return res.send({ error: 403, message: "编辑失败!" });
    res.send({ success: true });
  });
});

//更新Activity全部信息
router.post("/updateActivity", function(req, res) {
  let activity = new Activity({
    id: req.body.id ? parseInt(req.body.id) : null,
    theme: req.body.theme,
    activityAddress: req.body.activityAddress,
    introduce: req.body.introduce,
    activityTheDetail: req.body.activityTheDetail,
    initateTime: req.body.initateTime,
    spending: req.body.spending ? parseInt(req.body.spending) : null,
    state: req.body.state? parseInt(req.body.state) : null,
    empName: req.body.empName
   });



  Activity.updateActivity(activity, function(err, data) {
    if (err) return res.send({ error: 403, message: "编辑失败!" });
    res.send({ success: true });
  });
});

//删除Activity全部信息
router.post("/deleteActivity", function(req, res) {
  var ids = req.body.ids;
  Activity.deleteActivity(ids, function(err, data) {
    if (err) return res.send({ error: 403, message: "删除失败!" });
    res.send({ success: true });
  });
});

module.exports = router;
