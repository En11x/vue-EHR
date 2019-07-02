//ehr_Applicant 员工薪资表
var express = require("express");
var router = express.Router();
var Applicant = require("../models/applicant");

//获取全部信息
router.get("/queryApplicant", function(req, res) {
  Applicant.queryApplicant((err, data) => {
    if (err) return res.send({ error: 403, message: "数据库异常！" });
    res.send(data)
  });
});

//增加
router.post("/addApplicant", function(req, res) {
    let applicant = new Applicant({
        id:req.body.id?parseInt(req.body.id):null,
        name:req.body.name,
        sex:req.body.sex,
        phone:req.body.phone,
        qq:req.body.qq,
        email:req.body.email,
        age:req.body.age,
        currentAddress:req.body.currentAddress,
        applicantTime:req.body.applicantTime,
        specialty:req.body.specialty,
        comments:req.body.comments,
        mark:req.body.mark,
    })
    Applicant.addApplicant(applicant,function(err,data){
        if(err)return res.send({'error':403,"message":'编辑失败!'})
        res.send({"success":true})
    })
});

//更新Applicant全部信息
router.post("/updateApplicant", function(req, res) {
    let applicant = new Applicant({
        id : parseInt( req.body.id ),
        name:req.body.name,
        sex:parseInt(req.body.sex),
        phone:req.body.phone,
        qq:req.body.qq,
        email:req.body.email,
        age:parseInt(req.body.age),
        currentAddress:req.body.currentAddress,
        applicantTime:new Date(req.body.applicantTime),
        specialty:req.body.specialty,
        comments:req.body.comments,
        mark:req.body.mark,
        offered:req.body.offered,
    })
    
    Applicant.updateApplicant(applicant,function(err,data){
        if(err)return res.send({'error':403,"message":'编辑失败!'})
        res.send({"success":true})
    })
});

//更新Applicant全部信息
router.post("/updateOffered", function(req, res) {
    let applicant = {
        id : parseInt( req.body.id ),
        offered:req.body.offered,
    }
    
    Applicant.updateOffered(applicant,function(err,data){
        if(err)return res.send({'error':403,"message":'编辑失败!'})
        res.send({"success":true})
    })
});

//删除Applicant全部信息
router.post("/deleteApplicant", function(req, res) {
    var ids = req.body.ids
    Applicant.deleteApplicant(ids,function(err,data){
        if(err)return res.send({'error':403,"message":'删除失败!'})
        res.send({"success":true})
    })
});

module.exports = router;
