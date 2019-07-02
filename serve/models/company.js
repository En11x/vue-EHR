var db = require("./db.js");
//ehr_company
function Company(company) {
  this.id = company.id;
  this.name = company.name;
  this.address = company.address;
  this.mark = company.mark;
  this.logicToDelete = company.logicToDelete;
  this.createTime = company.createTime;
}

Company.addCompany = function(company, callback) {
  var selectSql =
    "insert into ehr_company (id,name,address,mark,logicToDelete,createTime) values (null,?,?,?,1,?)";
  db.query(
    selectSql,
    [company.name, company.address, company.mark, company.createTime],
    function(err, result) {
      if (err)return callback(err);
      callback(err, result);
    }
  );
};
//更新Company
Company.updateCompany = function(company, callback) {
  let selectSql =
    "update ehr_company set name =?,address =?,mark=?,createTime=? where id = ?";
  db.query(
    selectSql,
    [
      company.name,
      company.address,
      company.mark,
      company.createTime,
      company.id
    ],
    function(err, result) {
      if (err) return callback(err);
      callback(err, result);
    }
  );
};

Company.queryCompany = function(callback) {
    var selectSql =
      "select * from ehr_company where logicToDelete = 1";
    db.query(selectSql, function(err, result) {
      if (err) {
        return callback(err);
      }
      var data = result;
      callback(err, data);
    });
  };

//查询company数据的总数量
Company.countCompany = function(callback) {
  let selectSql = "select count(id) as count from ehr_company where logicToDelete = 1";
  db.query(selectSql, function(err, result) {
    if (err) return callback(err);
    callback(err, result[0]);
  });
};

//逻辑删除company信息
Company.deleteCompany = function(ids,callback){
    let selectSql = 'update ehr_company set logicToDelete = 0 where id in'
    selectSql = selectSql+'('+ids.toString()+')'
    console.log(selectSql)
    db.query(selectSql,function(err,result){
        if(err) callback(err)
        callback(err,result)
    })
}

module.exports = Company;
