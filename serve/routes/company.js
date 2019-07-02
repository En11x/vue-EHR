var express = require("express");
var router = express.Router();
var Company = require("../models/company");

//获取company全部信息
router.get("/queryCompany", function(req, res) {
  Company.queryCompany( (err, data) => {
    if (err) return res.send({ error: 403, message: "数据库异常！" });
    res.send(data)
  });
});

//获取company全部信息
router.post("/addCompany", function(req, res) {
    let company = new Company({
        id:req.body.id?parseInt(req.body.id):null,
        name: req.body.name,
        address:req.body.address,
        mark:req.body.mark,
        createTime:req.body.createTime?req.body.createTime:null
    })
    console.log(company)
    Company.addCompany(company,function(err,data){
        if(err)return res.send({'error':403,"message":'编辑失败!'})
        res.send({"success":true})
    })
});

//更新company全部信息
router.post("/updateCompany", function(req, res) {
    let company = new Company({
        id : parseInt( req.body.id ),
        name: req.body.name,
        address:req.body.address,
        mark:req.body.mark,
        createTime:req.body.createTime?req.body.createTime:null
    })
    Company.updateCompany(company,function(err,data){
        if(err)return res.send({'error':403,"message":'编辑失败!'})
        res.send({"success":true})
    })
});

//删除company全部信息
router.post("/deleteCompany", function(req, res) {
    var ids = req.body.ids
    Company.deleteCompany(ids,function(err,data){
        if(err)return res.send({'error':403,"message":'删除失败!'})
        res.send({"success":true})
    })
});

module.exports = router;
