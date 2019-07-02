//ehr_grade 员工薪资表
var express = require("express");
var router = express.Router();
var Grade = require("../models/grade");

//获取全部信息
router.get("/queryGrade", function(req, res) {
  Grade.queryGrade((err, data) => {
    if (err) return res.send({ error: 403, message: "数据库异常！" });
    res.send(data);
  });
});

//增加
router.post("/addGrade", function(req, res) {
  let grade = new Grade({
    id: req.body.id ? parseInt(req.body.id) : null,
    name: req.body.name,
    salary: req.body.salary ? parseInt(req.body.salary) : null,
    mark: req.body.mark
  });
  Grade.addGrade(grade, function(err, data) {
    if (err) return res.send({ error: 403, message: "编辑失败!" });
    res.send({ success: true });
  });
});

//更新grade全部信息
router.post("/updateGrade", function(req, res) {
  let grade = new Grade({
    id: req.body.id ? parseInt(req.body.id) : null,
    name: req.body.name,
    salary: req.body.salary ? parseInt(req.body.salary) : null,
    mark: req.body.mark
  });

  Grade.updateGrade(grade, function(err, data) {
    if (err) return res.send({ error: 403, message: "编辑失败!" });
    res.send({ success: true });
  });
});

//删除grade全部信息
router.post("/deleteGrade", function(req, res) {
  var ids = req.body.ids;
  Grade.deleteGrade(ids, function(err, data) {
    if (err) return res.send({ error: 403, message: "删除失败!" });
    res.send({ success: true });
  });
});

module.exports = router;
