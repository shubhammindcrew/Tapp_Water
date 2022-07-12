const express = require("express");
const router = express.Router();
var cron = require('node-cron');


// var t=  cron.schedule('* * * * *', () => {
//     console.log("*********")
//     CheckPaymentStatus()
// }, {
//     scheduled: true,
//     timezone: "America/New_York"
// })
// t.start();

async function CheckPaymentStatus() {
  
        // var mailOptionsforuser1 = {
        //     from: 'imshubham262@gmail.com',
        //     to: 'imshubham262@gmail.com',
        //     subject: 'We are waiting for you!',
            // html: '<!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head>  <title></title><meta http-equiv="X-UA-Compatible" content="IE=edge">  <!--<![endif]--><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style type="text/css">  #outlook a { padding: 0; }  .ReadMsgBody { width: 100%; }  .ExternalClass { width: 100%; }  .ExternalClass * { line-height:100%; }   body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }  table, td { border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }  img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }  p { display: block; margin: 13px 0; font-family: poppins; }</style><style type="text/css">  @media only screen and (max-width:480px) {    @-ms-viewport { width:320px; }    @viewport { width:320px; }  }</style><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300&display=swap" rel="stylesheet"> <style type="text/css">        @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);    </style><style type="text/css">  @media only screen and (min-width:480px) {    .mj-column-per-100 { width:100%!important; }  }</style></head><b  ody style="background: #F5F5F5;">    <div class="mj-container" style="background-color:#F5F5F5;"><div style="margin:0px auto;max-width:1000px;background:#FFFFFF;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#FFFFFF;  border-style: solid;border-color: grey;" align="left" border="0"><tbody></tbody></table></div><div style="margin:0px auto;max-width:600px;background:#FFFFFF;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#FFFFFF;" align="center" border="0"><tbody ><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:0px 0px 0px 0px;backgrounf-color: ;"><div style="margin:0px auto;max-width:1000px;background:white;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:##FFFFFF;" align="center" border="0"><tbody><tr><td style="text-align:left;vertical-align:top;direction:ltr;font-size:0px;padding:7px 0px 7px 0px; background-color:white"><div class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-wrap:break-word;font-size:0px;padding:0px 20px 0px 20px;" align="left"><div style="cursor:auto;color:white;font-size:18px;line-height:22px;text-align:left; padding: 10px"></div></td></tr></tbody></table></div></td></tr></tbody></table></div><hr><div style="margin:0px auto;max-width:1000px;background:white;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:white;" align="center" border="0"><tbody style="background:#ffffff;"><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:9px 0px 9px 0px;backgroung-color:white;"><div class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-wrap:break-word;font-size:0px;padding:0px 20px 0px 20px;" align="left"><div style="cursor:auto;color:#000000;font-size:11px;line-height:22px;text-align:left;"><h2>Hi</h2><p>Hope you are in the best of health and spirit!</p><br/><p>If youre anything like me you get busy and end up deciding to put some things on the back-burner.</p><p>A while ago you tried to purchase the PASS Card but I didnt hear back from you after that however were looking forward to having you as a member of the PASS family world thats why were sending you this invitation:</p><p><b>Coupon code PASS10</b></p><p>Use this code at check out to complete your order and get a 10% OFF on the purchase of your personalized PASS Card. </p><p>Thank you in advance for your purchase!</p><h2>Best Wishes,</h2><h2></h2><h3>PASS Card Team</h3><p></p>Instagram : <a href="https://instagram.com/passcard.me?utm_medium=copy_link">https://instagram.com/passcard.me?utm_medium=copy_link</a> <br/> Website : <a href="http://passcard.me"> http://passcard.me</a><br/><p>Thanks! </p><img  src="http://passcard.me/_nuxt/img/pass-logo.675debd.png" width="10%" height="10%;"></div></td></tr></tbody></table></div></td></tr></tbody></table></div><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;" border="0"><tbody><tr><td><div style="background-color:white; margin:0px auto;max-width:1000px;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:9px 0px 9px 0px;background-color:#00679A;"><div class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-wrap:break-word;font-size:0px;padding:0px 20px 0px 20px; background-color:#00679A";><div style="cursor:auto; background-color:#00679A;color:white; font-size:11px;line-height:22px;text-align:center;">&copy; Copyright 2022 Pass Card</p></div></td></tr></tbody></table></div></td></tr></tbody></table></div></td></tr></tbody></div></div></body></html>',
        // };
        // console.log("thsejk", mailOptionsforuser1)
        // transporter.sendMail(mailOptionsforuser1, async function (error, info) {
        //     if (error) {
        //         console.log(error);
        //         console.log("------------------------")
        //     } else {
        //         console.log(info);
   
        //     }
        // });
        consol.log("ok")
    } 


var task = cron.schedule('0 0 * * *', () => {
    CheckPaymentStatus()
});

task.start();

//CheckPaymentStatus()
module.exports = task;