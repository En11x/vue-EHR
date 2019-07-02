
var express = require('express');
var router = express.Router();
const fs = require('fs')
const formidable = require('formidable')
const multiparty=require("connect-multiparty")
const path = require('path')

const multer = require('multer')

//将生成的图片放入文件夹
var upload = multer({dest:'/upload/'})

// router.post('/image',function(req,res){
//     var form = new formidable.IncomingForm();
//     form.encoding = 'utf-8';
//     form.uploadDir = path.join(__dirname + "/../upload");
//     form.keepExtensions = true;//保留后缀
//     form.maxFieldsSize = 2 * 1024 * 1024;

//     form.parse(req, function (err, fields, files){
//         console.log(files.the_file);
//         var filename = files.the_file.name
//         var nameArray = filename.split('.');
//         var type = nameArray[nameArray.length - 1];
//         var name = '';
//         for (var i = 0; i < nameArray.length - 1; i++) {
//             name = name + nameArray[i];
//         }
//         var date = new Date();
//         var time = '_' + date.getFullYear() + "_" + date.getMonth() + "_" + date.getDay() + "_" + date.getHours() + "_" + date.getMinutes();
//         var avatarName = name + time + '.' + type;
//         var newPath = form.uploadDir + "/" + avatarName;
//         fs.renameSync(files.the_file.path, newPath);  //重命名
//         res.send({data:"/upload/"+avatarName})
//     })
//})


router.post('/addImg',upload.single('img'),function(req,res){
   //读取文件路径
   fs.readFile(req.file.path,(err,data)=>{
       if(err){return res.send('上传失败!')}
       
       //声明图片文字为时间戳和随机数拼接成的,确保位移行
       let time = Date.now() + parseInt(Math.random()*999) + parseInt(Math.random()*2222)
       //扩展名
       let extname = req.file.mimetype.split('/')[1]
       //拼接成图片名
       let keepname = time + '.' + extname
       //三个参数
       //1.图片的绝对路径
       //2.写入的内容
       //3.回调函数
       var a= '/static/upload/'+keepname
       var b = path.join(__dirname,'../../my_blog/static/upload/'+keepname)
       console.log(b)
       fs.writeFile(b,data,(err)=>{
           if(err){return res.send('写入失败')}
           res.send({success:true,path:a})
       })

   })
})

module.exports = router;