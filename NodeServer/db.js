
// const sqlite3 = require('sqlite3');  // 引入 sqlite3 模块https://www.liuzhanwu.cn/29819.html 
// const path = require('path');  // 引入路径处理模块
// const dbName = path.join(__dirname, 'autonomydiary.db');  // 获取当前运行目录下的 data.db 文件
// console.log(dbName);
// // 打开数据库
// const db = new sqlite3.Database(dbName, err => {
// if (err !== null) console.log(err);  // 输出错误信息
// });

// // var DB=DB||{};
// SqliteDB=function(){};//空构造函数
// SqliteDB.prototype.queryData = function(sql,callback){
// 	db.all(sql, (err, rows) => {
// 		if (err) console.log(err);  // 如果出现错误就输出错误信息
// 		// console.log(rows);  // 输出查询结果
// 		callback(rows);
// 		});
// }

// module.exports = SqliteDB;


var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var DB = DB || {};
DB.SqliteDB = function(file){
      DB.db = new sqlite3.Database(file);
   
      DB.exist = fs.existsSync(file);
     if(!DB.exist){
         console.log("Creating db file!");
         fs.openSync(file, 'w');
     };
 };
  
 DB.printErrorInfo = function(err){
     console.log("Error Message:" + err.message + " ErrorNumber:" + errno);
 };
  
 
 DB.SqliteDB.prototype.insertData = function(sql, objects){
     DB.db.serialize(function(){
         var stmt = DB.db.prepare(sql);
         for(var i = 0; i < objects.length; ++i){
             stmt.run(objects[i]);
         }
    
         stmt.finalize();
     });
 };
  
 DB.SqliteDB.prototype.queryData = function(sql, callback){
     DB.db.all(sql, function(err, rows){
         if(null != err){
             DB.printErrorInfo(err);
             return;
         }
  
         /// deal query data.
         if(callback){
             callback(rows);
         }
     });
 };
  
 DB.SqliteDB.prototype.executeSql = function(sql){
     DB.db.run(sql, function(err){
         if(null != err){
             DB.printErrorInfo(err);
         }
     });
 };
  
 DB.SqliteDB.prototype.close = function(){
     DB.db.close();
 };
  
 /// export SqliteDB.
 exports.SqliteDB = DB.SqliteDB;