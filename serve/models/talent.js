//ehr_talentpoolpool  人才库


var db = require("./db.js");

function Talent(talent) {
  this.id = talent.id;
  this.name = talent.name;
  this.sex = talent.sex;
  this.phone = talent.phone;
  this.QQ = talent.QQ;
  this.email = talent.email;
  this.age = talent.age;
  this.currentAddress = talent.currentAddress;
  this.specialty = talent.specialty;
  this.comments = talent.comments;
  this.asTheCompany = talent.asTheCompany;
  this.mark = talent.mark;
}

Talent.addTalent = function(talent, callback) {
  var selectSql =
    "insert into ehr_talentpool (id,name,sex,phone,QQ,email,age,currentAddress,specialty,comments,asTheCompany,mark,logicToDelete) values (null,?,?,?,?,?,?,?,?,?,?,?,1)";
  db.query(
    selectSql,
    [
      talent.name,
      talent.sex,
      talent.phone,
      talent.QQ,
      talent.email,
      talent.age,
      talent.currentAddress,
      talent.specialty,
      talent.comments,
      talent.asTheCompany,
      talent.mark
    ],
    function(err, result) {
      if (err) return callback(err);
      callback(err, result);
    }
  );
};
//更新
Talent.updateTalent = function(talent, callback) {
    console.log(talent)
  let selectSql =
    "update ehr_talentpool set name =?,sex =?,phone=?,QQ = ?,email = ?,age = ?,currentAddress = ?,specialty = ?,comments = ?,asTheCompany=?,mark = ? where id=?";
  db.query(
    selectSql,
    [
      talent.name,
      talent.sex,
      talent.phone,
      talent.QQ,
      talent.email,
      talent.age,
      talent.currentAddress,
      talent.specialty,
      talent.comments,
      talent.asTheCompany,
      talent.mark,
      talent.id
    ],
    function(err, result) {
      if (err) return callback(err);
      callback(err, result);
    }
  );
};

Talent.queryTalent = function(callback) {
  var selectSql =
    "select * from ehr_talentpool where logicToDelete = 1";
  db.query(selectSql, function(err, result) {
    if (err) {
      return callback(err);
    }
    var data = result;
    callback(err, data);
  });
};

//逻辑删除dept信息
Talent.deleteTalent = function(ids, callback) {
  let selectSql = "update ehr_talentpool set logicToDelete = 0 where id in";
  selectSql = selectSql + "(" + ids.toString() + ")";
  db.query(selectSql, function(err, result) {
    if (err) callback(err);
    callback(err, result);
  });
};

module.exports = Talent;
