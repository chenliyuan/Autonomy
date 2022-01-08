
var SqliteDB=require('./db.js').SqliteDB;

var localDb="/Users/chenliyuan/Documents/autonomy/autonomydiary.db"
var onlineDb="/diaryapi/publish/autonomydiary.db"
var sqliteDB=new SqliteDB(onlineDb);

var express=require('express');
var app=express();
app.get('/getRank',function(req,res){
	var sql='SELECT subitems.sub_item ,COUNT(*) count from item_Contents  JOIN subitems ON(item_Contents.itemid=subitems.ID) WHERE item_Contents.value!=0 GROUP BY item_Contents.itemid  ORDER BY count DESC';
	sqliteDB.queryData(sql,function(rows){res.send(rows)});
});
app.get('/',function (req,res) {
	res.send('nodejs接口!!')
})



function dataDeal(objects){
	for (let o of objects){
		console.log(o);
	}
}

var server = app.listen(3000, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})

