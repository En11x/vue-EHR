var express = require("express");
var router = express.Router();
var Departure = require("../models/departure");

//获取Departure全部信息
router.get("/queryDeparture", function(req, res) {
  Departure.queryDeparture((err, data) => {
    if (err) return res.send({ error: 403, message: "数据库异常！" });
    res.send(data)
  });
});

//增加
router.post("/addDeparture", function(req, res) {
    let departure = new Departure({
        id:req.body.id?parseInt(req.body.id):null,
        instructions: req.body.instructions,
        departureTime:req.body.departureTime,
        empName:req.body.empName
    })
    Departure.addDeparture(departure,function(err,data){
        if(err)return res.send({'error':403,"message":'编辑失败!'})
        res.send({"success":true})
    })
});

//更新Departure全部信息
router.post("/updateDeparture", function(req, res) {
    console.log(req.body)
    let departure = new Departure({
        id : parseInt( req.body.id ),
        instructions: req.body.instructions,
        departureTime:req.body.departureTime,
        empName:req.body.empName
    })
    console.log(departure)
    Departure.updateDeparture(departure,function(err,data){
        if(err)return res.send({'error':403,"message":'编辑失败!'})
        res.send({"success":true})
    })
});

//删除Departure全部信息
router.post("/deleteDeparture", function(req, res) {
    var ids = req.body.ids
    Departure.deleteDeparture(ids,function(err,data){
        if(err)return res.send({'error':403,"message":'删除失败!'})
        res.send({"success":true})
    })
});

module.exports = router;
