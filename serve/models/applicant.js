//ehr_applicant 应聘者管理

//ehr_applicant

var db = require("./db.js");

function Applicant(applicant) {
  this.id = applicant.id;
  this.name = applicant.name;
  this.sex = applicant.sex;
  this.phone = applicant.phone;
  this.qq = applicant.qq;
  this.email = applicant.email;
  this.age = applicant.age;
  this.currentAddress = applicant.currentAddress;
  this.applicantTime = applicant.applicantTime;
  this.specialty = applicant.specialty;
  this.comments = applicant.comments;
  this.mark = applicant.mark;
  this.offered = applicant.offered
}

Applicant.addApplicant = function(applicant, callback) {
  var selectSql =
    "insert into ehr_applicant (id,name,sex,phone,qq,email,age,currentAddress,applicantTime,specialty,comments,mark,logicToDelete,offered) values (null,?,?,?,?,?,?,?,?,?,?,?,1,1)";
  db.query(
    selectSql,
    [
      applicant.name,
      applicant.sex,
      applicant.phone,
      applicant.qq,
      applicant.email,
      applicant.age,
      applicant.currentAddress,
      applicant.applicantTime,
      applicant.specialty,
      applicant.comments,
      applicant.mark
    ],
    function(err, result) {
      if (err) return callback(err);
      callback(err, result);
    }
  );
};
//更新
Applicant.updateApplicant = function(applicant, callback) {
    console.log(applicant)
  let selectSql =
    "update ehr_applicant set name =?,sex =?,phone=?,qq = ?,email = ?,age = ?,currentAddress = ?,applicantTime = ?,specialty = ?,comments = ?,mark = ? where id=?";
  db.query(
    selectSql,
    [
      applicant.name,
      applicant.sex,
      applicant.phone,
      applicant.qq,
      applicant.email,
      applicant.age,
      applicant.currentAddress,
      applicant.applicantTime,
      applicant.specialty,
      applicant.comments,
      applicant.mark,
      applicant.id
      
    ],
    function(err, result) {
      if (err) return callback(err);
      callback(err, result);
    }
  );
};

Applicant.updateOffered = function(applicant, callback) {
    console.log(applicant)
  let selectSql =
    "update ehr_applicant set offered=? where id=?";
  db.query(
    selectSql,
    [
      applicant.offered,
      applicant.id
      
    ],
    function(err, result) {
      if (err) return callback(err);
      callback(err, result);
    }
  );
};

Applicant.queryApplicant = function(callback) {
  var selectSql =
    "select * from ehr_applicant where logicToDelete = 1";
  db.query(selectSql, function(err, result) {
    if (err) {
      return callback(err);
    }
    var data = result;
    callback(err, data);
  });
};

//逻辑删除dept信息
Applicant.deleteApplicant = function(ids, callback) {
  let selectSql = "update ehr_applicant set logicToDelete = 0 where id in";
  selectSql = selectSql + "(" + ids.toString() + ")";
  db.query(selectSql, function(err, result) {
    if (err) callback(err);
    callback(err, result);
  });
};

module.exports = Applicant;
