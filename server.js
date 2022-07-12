var MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const bodyParser = require("body-parser");
const express=require("express");
const croneRouter = require("./app/cronjob/cron");

const app=express();
app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.use(cors());

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

app.use()
var ObjectID = require('mongodb').ObjectID; 

var url = "mongodb://127.0.0.1:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Tapp");
 
});


app.post("/fetch_data_all_tables",(req,res)=>{   


var condition={"basic_details_id":req.body.basic_details_id}; 
var table_Array=req.body.table;
var all_data={};

for(let i=0;i<table_Array.length;i++){

    dbo.collection(table_Array[i]).find(condition).toArray(function(err, result){
    if (err) throw err;   

    // setTimeout(()=>{
      all_data[table_Array[i]]=result;   
      
      if(i==(table_Array.length-1)){
       
        callback(all_data,res)
      }
    // },1000)
  
    });


}
});

function callback(all_data,res){
// console.log("all_data",all_data)
return res.json(all_data);

}

  app.listen(3000,function(){

      console.log("running....")
  })
