var express = require("express");
var router = express.Router();
var Position = require("../models/position");

//获取position全部信息
router.get("/queryPosition", function(req, res) {
  Position.queryPosition((err, data) => {
    if (err) return res.send({ error: 403, message: "数据库异常！" });
    res.send(data)
  });
});

//增加
router.post("/addPosition", function(req, res) {
    let position = new Position({
        id:req.body.id?parseInt(req.body.id):null,
        name: req.body.name,
        mark:req.body.mark,
        deptId:req.body.deptId
    })
    Position.addPosition(position,function(err,data){
        if(err)return res.send({'error':403,"message":'编辑失败!'})
        res.send({"success":true})
    })
});

//更新position全部信息
router.post("/updatePosition", function(req, res) {
    let position = new Position({
        id : parseInt( req.body.id ),
        name: req.body.name,
        mark:req.body.mark,
        deptId:req.body.deptId
    })
    
    Position.updatePosition(position,function(err,data){
        if(err)return res.send({'error':403,"message":'编辑失败!'})
        res.send({"success":true})
    })
});

//删除position全部信息
router.post("/deletePosition", function(req, res) {
    var ids = req.body.ids
    Position.deletePosition(ids,function(err,data){
        if(err)return res.send({'error':403,"message":'删除失败!'})
        res.send({"success":true})
    })
});

module.exports = router;
