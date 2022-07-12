const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');
var cron = require('node-cron');
const nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
var winston = require('winston'),
    expressWinston = require('express-winston');

var cors = require('cors')
const cronRouter = require("./app/cronjob/cron");

const app = express();

app.use(cors());
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  meta: true, // optional: control whether you want to log the meta data about the request (default to true)
  msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
  ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
}));


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
 });

 
// parse requests of content-type - application/json
app.use(bodyParser.json())

require('./app/routes/note.routes.js')(app);
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// create express app
var transporter = nodemailer.createTransport(({
  service: 'gmail',
  auth: {
      user: 'imshubham262@gmail.com',
      pass: '119977161549'
  }
}));

//////crone////////////////////////////////

async function CheckPaymentStatus() {
  
  
        var mailOptionsforuser1 = {
            from: 'imshubham262@gmail.com',
            to: 'imshubham262@gmail.com',
            subject: 'We are waiting for you!',
        html: '<!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head>  <title></title><meta http-equiv="X-UA-Compatible" content="IE=edge">  <!--<![endif]--><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style type="text/css">  #outlook a { padding: 0; }  .ReadMsgBody { width: 100%; }  .ExternalClass { width: 100%; }  .ExternalClass * { line-height:100%; }   body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }  table, td { border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }  img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }  p { display: block; margin: 13px 0; font-family: poppins; }</style><style type="text/css">  @media only screen and (max-width:480px) {    @-ms-viewport { width:320px; }    @viewport { width:320px; }  }</style><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300&display=swap" rel="stylesheet"> <style type="text/css">        @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);    </style><style type="text/css">  @media only screen and (min-width:480px) {    .mj-column-per-100 { width:100%!important; }  }</style></head><b  ody style="background: #F5F5F5;">    <div class="mj-container" style="background-color:#F5F5F5;"><div style="margin:0px auto;max-width:1000px;background:#FFFFFF;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#FFFFFF;  border-style: solid;border-color: grey;" align="left" border="0"><tbody></tbody></table></div><div style="margin:0px auto;max-width:600px;background:#FFFFFF;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#FFFFFF;" align="center" border="0"><tbody ><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:0px 0px 0px 0px;backgrounf-color: ;"><div style="margin:0px auto;max-width:1000px;background:white;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:##FFFFFF;" align="center" border="0"><tbody><tr><td style="text-align:left;vertical-align:top;direction:ltr;font-size:0px;padding:7px 0px 7px 0px; background-color:white"><div class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-wrap:break-word;font-size:0px;padding:0px 20px 0px 20px;" align="left"><div style="cursor:auto;color:white;font-size:18px;line-height:22px;text-align:left; padding: 10px"></div></td></tr></tbody></table></div></td></tr></tbody></table></div><hr><div style="margin:0px auto;max-width:1000px;background:white;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:white;" align="center" border="0"><tbody style="background:#ffffff;"><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:9px 0px 9px 0px;backgroung-color:white;"><div class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-wrap:break-word;font-size:0px;padding:0px 20px 0px 20px;" align="left"><div style="cursor:auto;color:#000000;font-size:11px;line-height:22px;text-align:left;"><h2>Hi</h2><p>Hope you are in the best of health and spirit!</p><br/><p>If youre anything like me you get busy and end up deciding to put some things on the back-burner.</p><p>A while ago you tried to purchase the PASS Card but I didnt hear back from you after that however were looking forward to having you as a member of the PASS family world thats why were sending you this invitation:</p><p><b>Coupon code PASS10</b></p><p>Use this code at check out to complete your order and get a 10% OFF on the purchase of your personalized PASS Card. </p><p>Thank you in advance for your purchase!</p><h2>Best Wishes,</h2><h2></h2><h3>PASS Card Team</h3><p></p>Instagram : <a href="https://instagram.com/passcard.me?utm_medium=copy_link">https://instagram.com/passcard.me?utm_medium=copy_link</a> <br/> Website : <a href="http://passcard.me"> http://passcard.me</a><br/><p>Thanks! </p><img  src="http://passcard.me/_nuxt/img/pass-logo.675debd.png" width="10%" height="10%;"></div></td></tr></tbody></table></div></td></tr></tbody></table></div><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;" border="0"><tbody><tr><td><div style="background-color:white; margin:0px auto;max-width:1000px;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:9px 0px 9px 0px;background-color:#00679A;"><div class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-wrap:break-word;font-size:0px;padding:0px 20px 0px 20px; background-color:#00679A";><div style="cursor:auto; background-color:#00679A;color:white; font-size:11px;line-height:22px;text-align:center;">&copy; Copyright 2022 Pass Card</p></div></td></tr></tbody></table></div></td></tr></tbody></table></div></td></tr></tbody></div></div></body></html>',
        };
        console.log("thsejk", mailOptionsforuser1)
        transporter.sendMail(mailOptionsforuser1, async function (error, info) {
            if (error) {
                console.log(error);
                console.log("------------------------")
            } else {
                console.log(info);
   
            }
        });} 


var task = cron.schedule('* * * * * *', () => {
//  CheckPaymentStatus();
});


task.start();


/////////////////////////////////////////


//  cio = new TrackClient('123', 'abc', {
//   timeout: 5000
// });
// cio.identify(1, {
//   email: 'monika.mindcrew1@gmail.com',
//   created_at: 1361205308,
//   first_name: 'Bob',
//   plan: 'basic'
// });

app.post("/fetch_data_all_tables",(req,res)=>{   


var condition={"basic_details_id":req.body.basic_details_id}; 
var table_Array=req.body.table;
var all_data={};
var dbo=dbConfig.url;
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

app.get("/all_tables_data",(req,res)=>{   


    var condition={"basic_details_id":req.body.basic_details_id}; 
    // var table_Array=req.body.table;
    // var all_data={};
    var dbo=dbConfig.url;


    dbo.basic_details.aggregate([
        { $lookup:
            {
                from:"water_safetys_datas",
                localField: "basic_details_id",
                foreignField:"basic_details_id",
                as:"water_safetys_datas"
              }
         }
        ]).toArray(function(err, res) {
        if (err) throw err;
        console.log(JSON.stringify(res));
        res.json(data);
        // db.close();
      });

    //start query
/*
    dbo.basic_details.aggregate( [ 
        { $lookup:
             {
               from:"water_safetys_datas",
               localField: "basic_details_id",
               foreignField:"basic_details_id",
               as:"water_safetys_datas"
             }
        },
            {
           $lookup:
             {
               from:"water_safetys",
               localField: "water_safetys_datas.update_id",
               foreignField:"Default_id",
               as:"default_water_safetys"
             }
        },
            {
           $lookup:
             {
               from:"general_datas",
               localField: "basic_details_id",
               foreignField:"basic_details_id",
               as:"general_datas"
             }
        },
            {
           $lookup:
             {
               from:"generals",
               localField: "general_datas.update_id",
               foreignField:"Default_id",
               as:"default_generals"
             }
        },
            {
           $lookup:
             {
               from:"pathogen_datas",
               localField: "basic_details_id",
               foreignField:"basic_details_id",
               as:"pathogen_datas"
             }
        },
        
            {
           $lookup:
             {
               from:"pathogens",
               localField: "pathogen_datas.update_id",
               foreignField:"Default_id",
               as:"default_pathogens"
             }
        },
            {
           $lookup:
             {
               from:"chemical_parameter_datas",
               localField: "basic_details_id",
               foreignField:"basic_details_id",
               as:"chemical_parameter_datas"
             }
        },
            {
           $lookup:
             {
               from:"chemical_parameters",
               localField: "chemical_parameter_datas.update_id",
               foreignField:"Default_id",
               as:"default_chemical_parameters"
             }
        },
            {
           $lookup:
             {
               from:"mineral_datas",
               localField: "basic_details_id",
               foreignField:"basic_details_id",
               as:"mineral_datas"
             }
        },
            {
           $lookup:
             {
               from:"minerals",
               localField: "mineral_datas.update_id",
               foreignField:"Default_id",
               as:"default_minerals"
             }
        },
            {
           $lookup:
             {
               from:"metal_datas",
               localField: "basic_details_id",
               foreignField:"basic_details_id",
               as:"metal_datas"
             }
        },
            {
           $lookup:
             {
               from:"metals",
               localField: "metal_datas.update_id",
               foreignField:"Default_id",
               as:"default_metals"
             }
        },
        
            {
           $lookup:
             {
               from:"chlorine_bi_product_datas",
               localField: "basic_details_id",
               foreignField:"basic_details_id",
               as:"chlorine_bi_product_datas"
             }
        },
            {
           $lookup:
             {
               from:"chlorine_bi_products",
               localField: "chlorine_bi_product_datas.update_id",
               foreignField:"Default_id",
               as:"default_chlorine_bi_products"
             }
        },
        
            {
           $lookup:
             {
               from:"haa_datas",
               localField: "basic_details_id",
               foreignField:"basic_details_id",
               as:"haa_datas"
             }
        },
            {
           $lookup:
             {
               from:"haas",
               localField: "haa_datas.update_id",
               foreignField:"Default_id",
               as:"default_haas"
             }
        },
            {
           $lookup:
             {
               from:"pesticide_datas",
               localField: "basic_details_id",
               foreignField:"basic_details_id",
               as:"pesticide_datas"
             }
        },
            {
           $lookup:
             {
               from:"pesticides",
               localField: "pesticide_datas.update_id",
               foreignField:"Default_id",
               as:"default_pesticides"
             }
        },
            {
           $lookup:
             {
               from:"herbicide_datas",
               localField: "basic_details_id",
               foreignField:"basic_details_id",
               as:"herbicide_datas"
             }
        },
            {
           $lookup:
             {
               from:"herbicides",
               localField: "herbicide_datas.update_id",
               foreignField:"Default_id",
               as:"default_herbicides"
             }
        },
            {
           $lookup:
             {
               from:"perfluorinated_chemical_datas",
               localField: "basic_details_id",
               foreignField:"basic_details_id",
               as:"perfluorinated_chemical_datas"
             }
        },
        
            {
           $lookup:
             {
               from:"perfluorinated_chemicals",
               localField: "perfluorinated_chemical_datas.update_id",
               foreignField:"Default_id",
               as:"default_perfluorinated_chemicals"
             }
        },
            {
           $lookup:
             {
               from:"other_datas",
               localField: "basic_details_id",
               foreignField:"basic_details_id",
               as:"other_datas"
             }
        },
            {
           $lookup:
             {
               from:"others",
               localField: "other_datas.update_id",
               foreignField:"Default_id",
               as:"default_other_data"
             }
        },
            {
           $lookup:
             {
               from:"pharmaceutical_datas",
               localField: "basic_details_id",
               foreignField:"basic_details_id",
               as:"pharmaceutical_datas"
             }
        },
            {
           $lookup:
             {
               from:"pharmaceuticals",
               localField: "pharmaceutical_datas.update_id",
               foreignField:"Default_id",
               as:"default_other_data"
             }
        },
        { $match: { "basic_details_id" : "5e6f7e4501828f6148d53524" } }] ,
        function( err, data ) {      
          if ( err )
            throw err;      
          console.log( JSON.stringify( data, undefined, 2 ) );
          return res.json(data);
        })*/
        
        
        
        
        
        
    //end query
   
    });

function callback(all_data,res){
// console.log("all_data",all_data)
return res.json(all_data);

}

  

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

// listen for requests
const server = app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

server.timeout = 10000;
