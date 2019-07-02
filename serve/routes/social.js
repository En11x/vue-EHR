//ehr_Social 员工薪资表
var express = require("express");
var router = express.Router();
var Social = require("../models/social");

//获取全部信息
router.get("/querySocial", function(req, res) {
  Social.querySocial((err, data) => {
    if (err) return res.send({ error: 403, message: "数据库异常！" });
    res.send(data);
  });
});

//增加
router.post("/addSocial", function(req, res) {
  let social = new Social({
    id: req.body.id ? parseInt(req.body.id) : null,
    rate: req.body.purchaseRate ? parseInt(req.body.purchaseRate) : null,
  });
  Social.addSocial(social, function(err, data) {
    if (err) return res.send({ error: 403, message: "编辑失败!" });
    res.send({ success: true });
  });
});

//更新Social全部信息
router.post("/updateSocial", function(req, res) {
  let social = new Social({
    id: req.body.id ? parseInt(req.body.id) : null,
    salary: req.body.purchaseRate ? parseInt(req.body.purchaseRate) : null,
  });

  Social.updateSocial(social, function(err, data) {
    if (err) return res.send({ error: 403, message: "编辑失败!" });
    res.send({ success: true });
  });
});

//删除Social全部信息
router.post("/deleteSocial", function(req, res) {
  var ids = req.body.ids;
  Social.deleteSocial(ids, function(err, data) {
    if (err) return res.send({ error: 403, message: "删除失败!" });
    res.send({ success: true });
  });
});

module.exports = router;
