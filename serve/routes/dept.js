var express = require("express");
var router = express.Router();
var Dept = require("../models/dept");

//获取dept全部信息
router.get("/queryDept", function(req, res) {
  Dept.queryDept((err, data) => {
    if (err) return res.send({ error: 403, message: "数据库异常！" });
    res.send(data)
  });
});

//增加
router.post("/addDept", function(req, res) {
    let dept = new Dept({
        id:req.body.id?parseInt(req.body.id):null,
        name: req.body.name,
        mark:req.body.mark,
        companyId:req.body.companyId
    })
    Dept.addDept(dept,function(err,data){
        if(err)return res.send({'error':403,"message":'编辑失败!'})
        res.send({"success":true})
    })
});

//更新dept全部信息
router.post("/updateDept", function(req, res) {
    console.log(req.body)
    let dept = new Dept({
        id : parseInt( req.body.id ),
        name: req.body.name,
        mark:req.body.mark,
        companyId:req.body.companyId
    })
    console.log(dept)
    Dept.updateDept(dept,function(err,data){
        if(err)return res.send({'error':403,"message":'编辑失败!'})
        res.send({"success":true})
    })
});

//删除dept全部信息
router.post("/deleteDept", function(req, res) {
    var ids = req.body.ids
    Dept.deleteDept(ids,function(err,data){
        if(err)return res.send({'error':403,"message":'删除失败!'})
        res.send({"success":true})
    })
});

module.exports = router;
