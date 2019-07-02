//ehr_compensation 员工薪资表
var express = require("express");
var router = express.Router();
var Compensation = require("../models/compensation");

//获取全部信息
router.get("/queryCompensation", function(req, res) {
  Compensation.queryCompensation((err, data) => {
    if (err) return res.send({ error: 403, message: "数据库异常！" });
    res.send(data)
  });
});

//增加
router.post("/addCompensation", function(req, res) {
    let compensation = new Compensation({
        id:req.body.id?parseInt(req.body.id):null,
        basicSalary: req.body.basicSalary,
        subsidies:req.body.subsidies,
        socialSecurityId:req.body.socialSecurityId,
        socialSecurityRate:parseInt(req.body.purchaseRate),
        empId:req.body.empId
    })
    Compensation.addCompensation(compensation,function(err,data){
        if(err)return res.send({'error':403,"message":'编辑失败!'})
        res.send({"success":true})
    })
});

//更新compensation全部信息
router.post("/updateCompensation", function(req, res) {
    let compensation = new Compensation({
        id : parseInt( req.body.id ),
        basicSalary: req.body.basicSalary,
        subsidies:req.body.subsidies,
        socialSecurityId:req.body.socialSecurityId,
        empId:req.body.empId
    })
    
    Compensation.updateCompensation(compensation,function(err,data){
        if(err)return res.send({'error':403,"message":'编辑失败!'})
        res.send({"success":true})
    })
});

//删除compensation全部信息
router.post("/deleteCompensation", function(req, res) {
    var ids = req.body.ids
    Compensation.deleteCompensation(ids,function(err,data){
        if(err)return res.send({'error':403,"message":'删除失败!'})
        res.send({"success":true})
    })
});

module.exports = router;
