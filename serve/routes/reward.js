var express = require("express");
var router = express.Router();
var Reward = require("../models/rewardpunish");

//获取Reward全部信息
router.get("/queryReward", function(req, res) {
  Reward.queryReward((err, data) => {
    if (err) return res.send({ error: 403, message: "数据库异常！" });
    res.send(data)
  });
});

//增加
router.post("/addReward", function(req, res) {
    let reward = new Reward({
        id:req.body.id?parseInt(req.body.id):null,
        situation: req.body.situation,
        money : parseInt(req.body.money),
        judge : parseInt(req.body.judge),
        time : req.body.time,
        empId : req.body.empId,
        empName : req.body.name
    })
    console.log(reward)
    Reward.addReward(reward,function(err,data){
        if(err)return res.send({'error':403,"message":'编辑失败!'})
        res.send({"success":true})
    })
});

//更新Reward全部信息
router.post("/updateReward", function(req, res) {
    let reward = new Reward({
        id : parseInt( req.body.id ),
        situation: req.body.situation,
        money : req.body.money,
        judge : req.body.judge,
        time : req.body.time,
        empId : req.body.emp_id,
        empName:req.body.name
    })
    
    Reward.updateReward(reward,function(err,data){
        if(err)return res.send({'error':403,"message":'编辑失败!'})
        res.send({"success":true})
    })
});

//删除Reward全部信息
router.post("/deleteReward", function(req, res) {
    var ids = req.body.ids
    Reward.deleteReward(ids,function(err,data){
        if(err)return res.send({'error':403,"message":'删除失败!'})
        res.send({"success":true})
    })
});

module.exports = router;
