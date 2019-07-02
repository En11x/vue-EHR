//ehr_Holiday 员工薪资表
var express = require("express");
var router = express.Router();
var Holiday = require("../models/holiday");

//获取全部信息
router.get("/queryHoliday", function(req, res) {
  Holiday.queryHoliday((err, data) => {
    if (err) return res.send({ error: 403, message: "数据库异常！" });
    res.send(data);
  });
});

//增加
router.post("/addHoliday", function(req, res) {
  let holiday = new Holiday({
    id: req.body.id ? parseInt(req.body.id) : null,
    name: req.body.name,
    time: req.body.time,
    content: req.body.content
  });
  Holiday.addHoliday(holiday, function(err, data) {
    if (err) return res.send({ error: 403, message: "编辑失败!" });
    res.send({ success: true });
  });
});

//更新Holiday全部信息
router.post("/updateHoliday", function(req, res) {
  let holiday = new Holiday({
    id: req.body.id ? parseInt(req.body.id) : null,
    name: req.body.name,
    time: req.body.time,
    content: req.body.content
  });

  Holiday.updateHoliday(holiday, function(err, data) {
    if (err) return res.send({ error: 403, message: "编辑失败!" });
    res.send({ success: true });
  });
});

//删除Holiday全部信息
router.post("/deleteHoliday", function(req, res) {
  var ids = req.body.ids;
  Holiday.deleteHoliday(ids, function(err, data) {
    if (err) return res.send({ error: 403, message: "删除失败!" });
    res.send({ success: true });
  });
});

module.exports = router;
