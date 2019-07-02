var express = require("express");
var router = express.Router();
var Emp = require("../models/emp");

//获取emp全部信息
router.get("/queryEmp", function(req, res) {
  Emp.queryEmp((err, data) => {
    if (err) return res.send({ error: 403, message: "数据库异常！" });
    res.send(data)
  });
});

router.post("/queryEmpByUserId", function(req, res) {
    let emp = new Emp({
        userid:req.body.userid,
    })
    Emp.queryEmpByUserId(emp,(err, data) => {
      if (err) return res.send({ error: 403, message: "数据库异常！" });
      res.send(data)
    });
  });

//增加
router.post("/addEmp", function(req, res) {
    let emp = new Emp({
        id:req.body.id?parseInt(req.body.id):null,
        avatar : req.body.avatar,
        name : req.body.name,
        password : req.body.password,
        birthday : req.body.birthday,
        sex : req.body.sex,
        phone : req.body.phone,
        qq : req.body.qq,
        email : req.body.email,
        age : req.body.age,
        currentAddress : req.body.currentAddress,
        deptId : req.body.deptId,
        paygradesId : req.body.paygradesId,
        positionId : req.body.positionId
    })
    Emp.addEmp(emp,function(err,data){
        if(err)return res.send({'error':403,"message":'编辑失败!'})
        res.send({"success":true})
    })
});

//更新emp全部信息
router.post("/updateEmp", function(req, res) {
    console.log(req.body)
    let emp = new Emp({
        id:req.body.id?parseInt(req.body.id):null,
        avatar : req.body.avatar,
        name : req.body.name,
        password : req.body.password,
        birthday : req.body.birthday,
        sex : req.body.sex,
        phone : req.body.phone,
        QQ : req.body.QQ,
        userid : req.body.userid,
        sign:req.body.sign,
        email : req.body.email,
        age : req.body.age,
        currentAddress : req.body.currentAddress,
        deptId : req.body.deptId,
        paygradesId : req.body.paygradesId,
        positionId : req.body.positionId,
        positionName : req.body.positionName,
        deptName : req.body.deptName
    })
    console.log(emp)
    Emp.updateEmp(emp,function(err,data){
        if(err)return res.send({'error':403,"message":'编辑失败!'})
        res.send({"success":true})
    })
});


router.post("/editEmp", function(req, res) {
    console.log(req.body)
    let emp = new Emp({
        id:req.body.id?parseInt(req.body.id):null,
        avatar : req.body.avatar,
        name : req.body.name,
        password : req.body.password,
        birthday : req.body.birthday,
        sex : req.body.sex,
        phone : req.body.phone,
        QQ : req.body.QQ,
        userid : req.body.userid,
        sign:req.body.sign,
        email : req.body.email,
        age : req.body.age,
        currentAddress : req.body.currentAddress,
    })
    
    Emp.editEmp(emp,function(err,data){
        if(err)return res.send({'error':403,"message":'编辑失败!'})
        res.send({"success":true})
    })
});

//删除emp全部信息
router.post("/deleteEmp", function(req, res) {
    var ids = req.body.ids
    Emp.deleteEmp(ids,function(err,data){
        if(err)return res.send({'error':403,"message":'删除失败!'})
        res.send({"success":true})
    })
});

module.exports = router;
