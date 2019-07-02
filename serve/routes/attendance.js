//ehr_Attendance
var express = require("express");
var router = express.Router();
var Attendance = require("../models/attendance");

//获取全部信息
router.get("/queryAttendance", function(req, res) {
  Attendance.queryAttendance((err, data) => {
    if (err) return res.send({ error: 403, message: "数据库异常！" });
    res.send(data);
  });
});

//增加
router.post("/addAttendance", function(req, res) {
    console.log(req.body)
  let attendance = new Attendance({
    id: req.body.id ? parseInt(req.body.id) : null,
    clockInTime: req.body.clockInTime,
    clockInIocation: req.body.clockInIocation,
    tag: req.body.tag,
    empName: req.body.empName
  });
  Attendance.addAttendance(attendance, function(err, data) {
    if (err) return res.send({ error: 403, message: "编辑失败!" });
    res.send({ success: true });
  });
});

//更新Attendance全部信息
router.post("/updateAttendance", function(req, res) {
  let attendance = new Attendance({
    id: req.body.id ? parseInt(req.body.id) : null,
    clockInTime: req.body.clockInTime,
    clockInIocation: req.body.clockInIocation,
    tag: req.body.tag,
    empName: req.body.empName
  });
 

  Attendance.updateAttendance(attendance, function(err, data) {
    if (err) return res.send({ error: 403, message: "编辑失败!" });
    res.send({ success: true });
  });
});

//删除Attendance全部信息
router.post("/deleteAttendance", function(req, res) {
  var ids = req.body.ids;
  Attendance.deleteAttendance(ids, function(err, data) {
    if (err) return res.send({ error: 403, message: "删除失败!" });
    res.send({ success: true });
  });
});

module.exports = router;
