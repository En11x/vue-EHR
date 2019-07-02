//ehr_socialsecurity 社保比例


var db = require("./db.js");

function Social(social) {
  this.id = social.id;
  this.rate = social.rate;
}

Social.addSocial = function(social, callback) {
  var selectSql =
    "insert into ehr_socialsecurity (id,purchaseRate,logicToDelete) values (null,?,1)";
  db.query(selectSql, [social.rate], function(
    err,
    result
  ) {
    if (err) return callback(err);
    callback(err, result);
  });
};
//更新dept
Social.updateSocial = function(social, callback) {
  let selectSql =
    "update ehr_socialsecurity set purchaseRate =? where id=?";
  db.query(selectSql, [social.rate,social.id], function(err,result) {
    if (err) return callback(err);
    callback(err, result);
  });
};

Social.querySocial = function(callback) {
  var selectSql =
    "select * from ehr_socialsecurity where logicToDelete = 1";
  db.query(selectSql, function(err, result) {
    if (err) {
      return callback(err);
    }
    var data = result;
    callback(err, data);
  });
};

//逻辑删除dept信息
Social.deleteSocial = function(ids, callback) {
  let selectSql = "update ehr_socialsecurity set logicToDelete = 0 where id in";
  selectSql = selectSql + "(" + ids.toString() + ")";
  db.query(selectSql, function(err, result) {
    if (err) callback(err);
    callback(err, result);
  });
};

module.exports = Social;
