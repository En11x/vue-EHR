//ehr_Channel
var express = require("express");
var router = express.Router();
var Channel = require("../models/channel");

//获取全部信息
router.get("/queryChannel", function(req, res) {
  Channel.queryChannel((err, data) => {
    if (err) return res.send({ error: 403, message: "数据库异常！" });
    res.send(data);
  });
});

//增加
router.post("/addChannel", function(req, res) {
  let channel = new Channel({
    id: req.body.id ? parseInt(req.body.id) : null,
    name: req.body.name,
    mark: req.body.mark,
    addTime: req.body.addTime,
  });
  Channel.addChannel(channel, function(err, data) {
    if (err) return res.send({ error: 403, message: "编辑失败!" });
    res.send({ success: true });
  });
});

//更新Channel全部信息
router.post("/updateChannel", function(req, res) {
  let channel = new Channel({
    id: req.body.id ? parseInt(req.body.id) : null,
    name: req.body.name,
    mark: req.body.mark,
    addTime: req.body.addTime,
  });

  Channel.updateChannel(channel, function(err, data) {
    if (err) return res.send({ error: 403, message: "编辑失败!" });
    res.send({ success: true });
  });
});

//删除Channel全部信息
router.post("/deleteChannel", function(req, res) {
  var ids = req.body.ids;
  Channel.deleteChannel(ids, function(err, data) {
    if (err) return res.send({ error: 403, message: "删除失败!" });
    res.send({ success: true });
  });
});

module.exports = router;
