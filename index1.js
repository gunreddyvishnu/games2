
const https = require('https');

var tax=0.08;
// var tax=0.10;
const crypto = require('crypto');
var bodyParser = require('body-parser')
const path = require('path');




const fileParser = require('express-multipart-file-parser');

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('./firebaseconfig.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
const storage = admin.storage();
const bucket = storage.bucket("sixgames-45430.appspot.com/");
const axios = require('axios');
// Set up Multer for file uploads
var upiid="Q423557577@ybl";


const auth = admin.auth();

const { createClient } = require('@supabase/supabase-js');


// Provide a custom `fetch` implementation as an option
const supabase = createClient('https://dxthcumunhjmpalfbgxr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4dGhjdW11bmhqbXBhbGZiZ3hyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg2NDc4MDAsImV4cCI6MjAxNDIyMzgwMH0.sbpeGxXAsL8afNWlKqVjMhwZzG5B_qOyOc-pBZH377w', {});



const sendMessage = async function(fcmToken, title, body) {
  console.log("Message call");

  try {
    const message = {
      notification: {
        body: body,
        title: title,
      },
      token: fcmToken,
    };

    const response = await admin.messaging().send(message);
    console.log("Message sent");
    console.log(response);
    return response;
  } catch (error) {
    console.error("Message sent error");
    return error;
  }
};

var validate=function (ss){
    if (ss!=null&&ss!=undefined&&ss!=""){
         return true
     }
     else{
         return false;
     }
 }

 function generateRandom4DigitNumber() {
    return Math.floor(1000 + Math.random() * 9000);
  }

  function generateRandomString(length) {
    const randomBytes = crypto.randomBytes(Math.ceil(length / 2));
    return randomBytes.toString('hex').slice(0, length);
  }
  

const express = require('express');

const app = express();
var bodyParser = require('body-parser');
const { error } = require('console');

// app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

const cors = require('cors')({origin: true});
app.use(cors);

app.use(fileParser);




var settlepayment=function(userid,amount){
    supabase.from("users").select("*").eq("userid",userid).then(function(userdetails){


    if(userdetails.data.length>0){

       

        supabase.from("users").update({
"wallet_balance": userdetails.data[0]["wallet_balance"]+amount
         

        }).eq("userid",userid)

    }

    })



}









var settler=function(
  gamedetails,
  winner,
  arg_from,
  arg_proof,
  arg_result,
  res

){

  gamedetails["amount_won"]=parseInt(gamedetails["amount_won"], 10);

  // gamedetails,  winner,  arg_from,    arg_proof,    arg_result,    res
  //gamedetails,   "C",    "host",       proof  ,     "LOST",         res;

  if(arg_from=="host"){

    console.log("arg from host");

if(winner=="H"||winner=="J"){
  supabase.from("games").update([{
    "host_argument":arg_result,
    "host_proof":arg_proof,
    "result":winner=="H"?"host":"guest",
    "status":5,

    
    }]).eq("id",gamedetails["id"]).then(function(rp){

      if(!rp.error){



        if(winner=="H"){

          supabase.from("users").select("*").eq("userid",gamedetails["host_id"]).then(function(ooo){



          if(ooo.data.length>0){

            supabase.from("users").update([{

"wallet_balance":ooo.data[0]["wallet_balance"]+gamedetails["amount_won"]

            }]).eq("userid",gamedetails["host_id"]).then(function(rdpor){



              if(!rdpor.error){


                res.send({
                  "error":false

                })

              }
              else{

                res.send({
                  "error":true,
                  "message":"please contact in help"

                })
              }

            })



          }


          })


        }
        else{



          supabase.from("users").select("*").eq("userid",gamedetails["guest_id"]).then(function(ooo){



            if(ooo.data.length>0){
  
              supabase.from("users").update([{
  
  "wallet_balance":ooo.data[0]["wallet_balance"]+gamedetails["amount_won"]
  
              }]).eq("userid",gamedetails["guest_id"]).then(function(rdpor){
  
  
  
                if(!rdpor.error){
  
  
                  res.send({
                    "error":false
  
                  })
  
                }
                else{
  
                  res.send({
                    "error":true,
                    "message":"please contact in help"
  
                  })
                }
  
              })
  
  
  
            }
  
  
            })
  


        }



      }
      else{

        console.log(rp.error);

      }

    })
}


if(winner=="R"){
  supabase.from("games").update([{
    "host_argument":arg_result,
    "host_proof":arg_proof,
    "status":4,

    
    }]).eq("id",gamedetails["id"]).then(function(rpos){

      if(!rpos.error){
       res.send({
        "error":false,
        
       });
      }
      else{
        res.send({
          "error":true,
          "message":"Please Try Again"
          
         });
      }

    })



}

if(winner=="C"){
  console.log("winner is c");
  supabase.from("games").update([{
    "host_argument":arg_result,
    "host_proof":arg_proof,
    "status":6,

    
    }]).eq("id",gamedetails["id"]).then(function(rpos){

      if(!rpos.error){
  
//// sender


        supabase.from("users").select("*").eq("userid",gamedetails["host_id"]).then(function(hr1){


          if(hr1.data.length>0){

            // wallet_balance
            // hr1.data[0]["wallet_balance"]


            supabase.from("users").update({
              "wallet_balance":hr1.data[0]["wallet_balance"]+gamedetails["amount"]
            }).eq("userid",gamedetails["host_id"]).then(function(opppse){


              if(!opppse.error){

                supabase.from("users").select("*").eq("userid",gamedetails["guest_id"]).then(function(hr2){

                  if(hr2.data.length>0){


                    supabase.from("users").update({
                      "wallet_balance":hr2.data[0]["wallet_balance"]+gamedetails["amount"]
                    }).eq("userid",gamedetails["guest_id"]).then(function(opppse){




                    if(!opppse.error){
                      res.send({
                        "error":false
                      })
                    }
                    else{
                      res.send({
                        "error":true,
                        "message":"please try again"
                      })

                    }

                    });

                  }



                })

              }
              else{
                res.send({
                  "error":true,
                  "message":"please try again"
                })
              }

            })



          }

        })









      }
      else{

        console.log(rpos.error);
        res.send({
          "error":true,
          "message":"Please Try Again"
          
         });
      }

    })






}
























  }
  else if(arg_from=="guest"){

    console.log("arg from guest");



    if(winner=="H"||winner=="J"){
      supabase.from("games").update([{
        "join_argument":arg_result,
        "result":winner=="H"?"host":"guest",
        "guest_proof":arg_proof,
        "status":5,
    
        
        }]).eq("id",gamedetails["id"]).then(function(rp){
    
          if(!rp.error){
    
    
            if(winner=="H"){
    
              supabase.from("users").select("*").eq("userid",gamedetails["host_id"]).then(function(ooo){
    
    
    
              if(ooo.data.length>0){
    
                supabase.from("users").update([{
    
    "wallet_balance":ooo.data[0]["wallet_balance"]+gamedetails["amount_won"]
    
                }]).eq("userid",gamedetails["host_id"]).then(function(rdpor){
    
    
    
                  if(!rdpor.error){
    
    
                    res.send({
                      "error":false
    
                    })
    
                  }
                  else{
    
                    res.send({
                      "error":true,
                      "message":"please contact in help"
    
                    })
                  }
    
                })
    
    
    
              }
    
    
              })
    
    
            }
            else{
    
    
    
              supabase.from("users").select("*").eq("userid",gamedetails["guest_id"]).then(function(ooo){
    
    
    
                if(ooo.data.length>0){
      
                  supabase.from("users").update([{
      
      "wallet_balance":ooo.data[0]["wallet_balance"]+gamedetails["amount_won"]
      
                  }]).eq("userid",gamedetails["guest_id"]).then(function(rdpor){
      
      
      
                    if(!rdpor.error){
      
      
                      res.send({
                        "error":false
      
                      })
      
                    }
                    else{
      
                      res.send({
                        "error":true,
                        "message":"please contact in help"
      
                      })
                    }
      
                  })
      
      
      
                }
      
      
                })
      
    
    
            }
    
    
    
          }
    
        })
    }
    



    if(winner=="R"){
      supabase.from("games").update([{
        "join_argument":arg_result,
        "guest_proof":arg_proof,
        "status":4,
    
        
        }]).eq("id",gamedetails["id"]).then(function(rpos){

          if(!rpos.error){
           res.send({
            "error":false,
            
           });
          }
          else{
            res.send({
              "error":true,
              "message":"Please Try Again"
              
             });
          }
    
        })
    
    
    
    }
    



    if(winner=="C"){

      supabase.from("games").update([{
        "join_argument":arg_result,
        "guest_proof":arg_proof,
        "status":6,
    
        
        }]).eq("id",gamedetails["id"]).then(function(rpos){

          if(!rpos.error){
        ///// sender


        supabase.from("users").select("*").eq("userid",gamedetails["host_id"]).then(function(hr1){


          if(hr1.data.length>0){

            // wallet_balance
            // hr1.data[0]["wallet_balance"]


            supabase.from("users").update({
              "wallet_balance":hr1.data[0]["wallet_balance"]+gamedetails["amount"]
            }).eq("userid",gamedetails["host_id"]).then(function(opppse){


              if(!opppse.error){

                supabase.from("users").select("*").eq("userid",gamedetails["guest_id"]).then(function(hr2){

                  if(hr2.data.length>0){


                    supabase.from("users").update({
                      "wallet_balance":hr2.data[0]["wallet_balance"]+gamedetails["amount"]
                    }).eq("userid",gamedetails["guest_id"]).then(function(opppse){




                    if(!opppse.error){
                      res.send({
                        "error":false
                      })
                    }
                    else{
                      res.send({
                        "error":true,
                        "message":"please try again"
                      })

                    }

                    });

                  }



                })

              }
              else{
                res.send({
                  "error":true,
                  "message":"please try again"
                })
              }

            })



          }

        })










          }
          else{
            res.send({
              "error":true,
              "message":"Please Try Again"
              
             });
          }
    
        })
    

  


    }














  }




}
app.get("/testotp",function(req,res){

    const url = 'https://www.fast2sms.com/dev/bulkV2';
    const authorization = 'vEdOVMqLJn0NHa9XUK8eQibIFsPCkwzcu7pmoxlY145Dy63TZtAdzFTvLDtmNHYuGZC7R9enaOfQVB0q';
    const route = 'otp';
    const variables_values = '3936';
    const flash = '0';
    const numbers = '9666222330';
    
    // Construct the final URL with query parameters
    const finalUrl = `${url}?authorization=${authorization}&route=${route}&variables_values=${variables_values}&flash=${flash}&numbers=${numbers}`;
    https.get(finalUrl, (response) => {
        let data = '';
      
        response.on('data', (chunk) => {
          data += chunk;
        });
      
        response.on('end', () => {
try{
    var data_json=JSON.parse(data);
    console.log(data_json)
    if(data_json["request_id"]!=undefined){
        /// otp sent 

    }
    else{
//// invalid number

    }
    
}
    
    catch(ee){}
    
});
      }).on('error', (error) => {
        console.error(`Error: ${error}`);
      });
    res.send("")
});
app.get("/",function(req,res){



    res.send(`<div id="main">
    <div class="fof">
            <h1>< / WELCOME ></h1>
    </div>
</div><style>*{
    transition: all 0.6s;
}

html {
    background:black;
    height: 100%;
}

body{
    font-family: 'Lato', sans-serif;
    color: #888;
    margin: 0;
}

#main{
    display: table;
    width: 100%;
    height: 100vh;
    text-align: center;
}

.fof{
	  display: table-cell;
	  vertical-align: middle;
}

.fof h1{
	  font-size: 50px;
	  display: inline-block;
	  padding-right: 12px;
	  animation: type .5s alternate infinite;
}

@keyframes type{
	  from{box-shadow: inset -3px 0px 0px #888;}
	  to{box-shadow: inset -3px 0px 0px transparent;}
}</style>`);
});
app.post("/login_otp",function(req,res){
console.log("action"+req.body);

    var mobilenum=req.body["mobilenum"];
if(validate(mobilenum)){

    if(mobilenum.length==10){

var generated_otp= mobilenum!="9985515054"?generateRandom4DigitNumber():3579;
// var generated_otp= 3579;


        const url = 'https://www.fast2sms.com/dev/bulkV2';
    const authorization = 'vEdOVMqLJn0NHa9XUK8eQibIFsPCkwzcu7pmoxlY145Dy63TZtAdzFTvLDtmNHYuGZC7R9enaOfQVB0q';
    const route = 'otp';
    const variables_values = generated_otp;
    const flash = '0';
    const numbers = mobilenum;
    
    // Construct the final URL with query parameters
    const finalUrl = `${url}?authorization=${authorization}&route=${route}&variables_values=${variables_values}&flash=${flash}&numbers=${numbers}`;
    https.get(finalUrl, (response) => {
        let data = '';
      
        response.on('data', (chunk) => {
          data += chunk;
        });
      
        response.on('end', () => {
try{
    var data_json=JSON.parse(data);
    console.log(data_json)
    if(data_json["request_id"]!=undefined){
        /// otp sent 

        // validity
        supabase
        .from('otp')
        .insert([
          { "otpvalue": generated_otp, "otp_token": data_json["request_id"], "mobile_num":mobilenum,
    
     
        },
        ])
        .select().then(function(result){

            if(!result.error){
                res.send({
                    "error":false,
                    "token":data_json["request_id"]
                })
            }
            else{
                res.send({
                    "error":true,
                    "message":"Invalid Mobile Number5"
                })
            }
        })







    }
    else{
//// invalid number
if(data_json["status_code"]==995){
    res.send({
        "error":true,
        "message":"Please Try After Some Time"
    })
}
else{
    res.send({
        "error":true,
        "message":"Invalid Mobile Number"
    })
}
 
    }
    
}
    
    catch(ee){
        console.log(ee);
        res.send({
            "error":true,
            "message":"Invalid Mobile Number2"
        })
    }
    
});
      }).on('error', (error) => {
        console.error(`Error: ${error}`);
      });


        


    }
    else{
        res.send({
            "error":true,
            "message":"Invalid Mobile Number3"
        })
    }


}
else{
    res.send({
        "error":true,
        "message":"Invalid Mobile Number4"
    })
}

});
app.post("/validate_otp",function(req,res){

    // supabase
    // .from('otp')
    // .insert([
    //   { "otpvalue": generated_otp, "otp_token": data_json["request_id"], "mobile_num":mobilenum,

 
    // },
    // ])
    // .select()


  var otp=req.body["otp"];
  var mobilenum=req.body["mobilenum"];
  var token=req.body["token"];


  if(validate(otp)&&validate(mobilenum)&&validate(token)){

    console.log(" step 1 pass");

  try{
    supabase.from("otp").select("*").eq("otp_token",token).then(function(data){
        console.log(" step 2 pass");
        if(data.data.length>0){
            console.log(" step 3 pass");


            if(data.data[0]["validity"]<4){
                console.log(" step 4 pass");
            if(data.data[0]["mobile_num"]==mobilenum&&otp==data.data[0]["otpvalue"]&&data.data[0]["otpvalue"]){
                console.log(" step 5 pass");
                supabase.from("otp").delete().eq("otp_token",token).then(function(reoo__){


                    try{

                        supabase.from("users").select("*").eq("userid",data.data[0]["mobile_num"]).then(function(userdetails){
                            console.log(" step 6 pass");
const sid= mobilenum!="9985515054"?generateRandomString(16):"2f3f8b5ca50a5a31";

                            if(userdetails.data.length>0){
/// user found 
console.log(userdetails);

if(userdetails.data[0]["name"]!=null){
    console.log(" step 7 pass");

    supabase.from("users").update({
        "sid":sid,
    }).eq("userid",data.data[0]["mobile_num"]).then(function(rds__){
        if(!rds__.error){
            res.send({
                "error":false,
                "route":"/home",
            "sid":sid,
            });
        }
    })

   

}
else{

    supabase.from("users").update({
        "sid":sid,
    }).eq("userid",data.data[0]["mobile_num"]).then(function(rds__){
        console.log(" step 8 pass");
        if(!rds__.error){
            res.send({
                "error":false,
                "sid":sid,
                "route":"/register"
            
            });
        
        }
    })
   
}}
                            else{
                                console.log(" step 9 pass");
                                /// user not found 
                              
                                supabase.from("users").insert([{
                                    "wallet_balance":20,
                                    "six_balance":0,
                                    "sid":sid,
                                    "userid":data.data[0]["mobile_num"]
                                }]).then(function(rds__){
                                    if(!rds__.error){
                                        res.send({
                                            "error":false,
                                            "sid":sid,
                                            "route":"/register"
                                        
                                        });
                                    
                                    }
                                    else{
                                        res.send(rds__.error)
                                    }
                                })
                               
                            }

                        })

                    }
                    catch(ee){}



                })


                
             

                
                




            }
            else
            {

                console.log(" step 10 pass");
                supabase.from("otp").update({
                    "validity":data.data[0]["validity"]+1,
                }).eq("otp_token",token).then(function(rr){
                    res.send({
                        "error":true,
                        "message":"Invalid OTP"
                    });
                })


            }
            

        }
        else{
            console.log(" step 11 pass");
            
            supabase.from("otp").delete().eq("otp_token",token).then(function(rr){
                res.send({
                    "error":true,
                    "message":"maximum login attempts exceeded"
                });
            
            })
            
        
        }
    }
    else{
        console.log(" step 3 fail");

        res.send({
            "error":true,
            "message":"Invalid OTP"
        })
    }
    });
  }
  catch(ee){
    console.log(" step 12 pass");
    res.send({
        "error":true,
        "message":"Invalid OTP"
    })
  }

    



  }

  else{
    res.send({
        "error":true,
        "message":"Invalid OTP"
    })


  }


});
app.post('/upload', (req, res) => {

  console.log("upload started");
  const file = req.files[0];


  // console.log(req.files);

  var mobilenum=req.body["mobilenum"];
  var sid=req.body["sid"];


  var from=req.body["from"];
    console.log("upload started");
    // from
    // review
    // profile
    var from

  if(validate(mobilenum)&&validate(sid)&&(from=="review"||from=="profile")){
    console.log("prams valid");
supabase.from("users").select("*").eq("userid",mobilenum).eq("sid",sid).

then(function(userdata){
  console.log("user valid");

    if(userdata.data.length>0){
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded.' });
          }
        
          // Generate a unique filename for the image
          const filename = `${Date.now()}-${file.originalname}`;
        
          // Upload the image to Firebase Storage

          // if()
          const fileStream = bucket.file(from+"/"+filename).createWriteStream();
        
          fileStream.on('error', (err) => {
            console.error('Error uploading file:', err);
            res.status(500).json({ message: 'Internal Server Error' });
          });
        
          fileStream.on('finish', (d) => {

      

            var imageUrl = `https://firebasestorage.googleapis.com/v0/b/sixgames-45430.appspot.com/o/${(from+"%2F"+filename)}?alt=media`;

            // _200x200
            if(from=="profile"){
              const parsedPath = path.parse(filename);

              const modifiedFilename = parsedPath.name + '_200x200' + parsedPath.ext;
             imageUrl = `https://firebasestorage.googleapis.com/v0/b/sixgames-45430.appspot.com/o/${(from+"%2F"+modifiedFilename)}?alt=media`;


            }

            
            console.log('Image URL:', imageUrl);
            res.json({ imageUrl });
          });
        
          fileStream.end(file.buffer);
    }
    else{
                    res.status(500).json({ message: 'Internal Server Error' });

    }
   
});
   

  }
  else{
    res.status(500).json({ message: 'Internal Server Error' });
  }

 
});
app.post('/registeruser',function(req,res){

    var mobilenum=req.body["mobilenum"];
    var sid=req.body["sid"];
  var name=req.body["name"];
  var dp=req.body["dp"];
  var reffercode=req.body["reffer_code"];


    if(validate(dp)&&validate(mobilenum)&&validate(sid)&&validate(name)&&validate(reffercode)){
console.log(sid);
       
            supabase.from("users").select("*").eq("userid",mobilenum).eq("sid",sid).
            
            then(function(userdata){
            
                if(userdata.data.length>0){
                    
                    supabase.from("users").update([{
                        "name":name,
                        "user_dp":dp,
                        "refferby":reffercode
                    }]).eq("userid",mobilenum).eq("sid",sid).then(function(upppp){
if(!upppp.error){
    res.send({
        "error":false,
        "route":"/home"
    })
}
else{
    res.send({
        "error":true,
        "message":"Try Again Later"
    })
}
                        

                    })


                }
                else{
                    res.send({
                        "error":true,
                        "message":"Try Again Later2"
                    })
                                // res.status(500).json({ message: 'Internal Server Error' });
            
                }


               
            });
               
            
              



    }
    else{
        res.send({
            "error":true,
            "message":"Please Fill All Details"
        });
    }



});
app.post('/account',function(req,res){


    var mobilenum=req.body["mobilenum"];
    var sid=req.body["sid"];

    if(validate(mobilenum)&&validate(sid)){


            supabase.from("users").select(
             'name,wallet_balance,user_dp,six_balance,refferby'
            
            ).eq("userid",mobilenum).eq("sid",sid).then(function(userdata){

                if(userdata.data.length>0){

                    res.send({
                        "error":false,
                        "data":userdata.data[0]
                    })



                }
                else{

                    res.send({
                        "error":true,
                        "route":"/login"
                    })

                }

            });





    }
    else{
        res.send({
            "error":true,
            "message":"Please Fill All Details"
        });


    }





});
app.post("/creategame",function(req,res){
    var mobilenum=req.body["mobilenum"];
    var sid=req.body["sid"];
    var amount=req.body["amount"];
    var fcm=req.body["fcm"];
    
    if(validate(mobilenum)&&validate(sid)&&Number.isInteger(amount)){

      if(amount>=10){
        supabase.from("users").select(
            'name,wallet_balance,user_dp,six_balance,refferby'
           
           ).eq("userid",mobilenum).eq("sid",sid).then(function(userdata){

            if(userdata.data.length>0){

if(userdata.data[0]["wallet_balance"]>=amount){

    supabase
        .from('games')
        .insert([
          { 

            "host_id":mobilenum,
            "host_fcm":fcm,
            "host_name":userdata.data[0]["name"],
            "amount":amount,
            "amount_won":(amount*2)-((amount*2)*tax),
            "status":0,
            "host_dp":userdata.data[0]["user_dp"],

        },
        ])
        .select().then(function(da){

  
   
            if(da["error"]==null)
            {

                supabase.from("users").update({

                    "wallet_balance":userdata.data[0]["wallet_balance"]-amount

                }).eq("userid",mobilenum).then(function(udd){
                 
 res.send({
                    "error":false,
                    "gameid":da["data"][0]["id"],
                });


                });

              
              
                // res.send({
                //     "error":false,
                //     "gameid":da["data"][0],
                // });
            }
            else{
            
                res.send({
                    "error":true,
                    "message":"Please Try Again"
                });
            }
           

        })
}
else{



                res.send({
                    "error":true,
                    "message":"Insufficient funds",
                    "route":"-"
                })

            


}
                
                

            }

            else{

                res.send({
                    "error":true,
                    "route":"/login"
                })

            }

           })
      }
      else{
        res.send({
            "error":true,
            "message":"Please Enter stake above 10 RS"
        });
    }



    }
    else{
        res.send({
            "error":true,
            "message":"Please Enter Valid Details"
        });
    }




});
app.post('/gamedetials',function(req,res){


    var gameid=req.body["gameid"];

    if(validate(gameid)){


            supabase.from("games").select("*")
            .eq("id",gameid).then(function(gamedata){

                if(gamedata.data.length>0){

                    res.send({
                        "error":false,
                        "data":gamedata.data[0]
                    })


                }
                else{

                    res.send({
                        "error":true,
                        "route":"/login"
                    })

                }

            });





    }
    else{
        res.send({
            "error":true,
            "message":"Please Fill All Details"
        });


    }





});
app.post('/uploadroomcode',function(req,res){
    var mobilenum=req.body["mobilenum"];
    var sid=req.body["sid"];
    var gameid=req.body["gameid"];
var room_code=req.body["room_code"];
    if(validate(mobilenum)&&validate(sid)&&validate(gameid)&&validate(room_code)){
    
        supabase.from("users").select("*").eq("userid",mobilenum).eq("sid",sid).then(function(userdata){

            if(userdata.data.length>0){

//// valid user

supabase.from("games").select("*").eq("id",gameid).then(function(gamedetails){



    if(gamedetails.data.length>0){

        /// game present 
        
        if(gamedetails.data[0]["host_id"]==mobilenum&&gamedetails.data[0]["room_code"]==null){



supabase.from("games").update({
    "room_code":room_code,
    "status":2
}).eq("id",gameid).then(function(resssss){

    if(!resssss.error){


      // http://115.96.194.166:3000/

      sendMessage(gamedetails.data[0]["guest_fcm"],"Room Code Added",`${room_code}`).then(function(){
        const url = 'http://whatsapp131131313.ddns.net:3000/sendmessage';

        const data = {
          roomcode: room_code.toString(),
          mobilenum: gamedetails.data[0]["guest_id"]
        };



        axios.post(url, data)
  .then(response => {
    res.send({
      "error":false,
    
 
  });
  })
  .catch(error => {
    res.send({
      "error":false,
    
 
  });
  });


        

      })
        
    }
    else{

        res.send({
            "error":true,
            "message":"please try again"
        })
    }



})


        }



    }
    else{

        /// invalid game details 
        res.send({
            "error":true,
            "message":"please try again"
        })
    }


})

               
                                
                                
                
                            }
                
                            else{

                                /// user auth failed 
                
                                res.send({
                                    "error":true,
                                    "route":"/login"
                                })
                
                            }



           })


    
    }
    else{
        res.send({
            "error":true,
            "message":"Please Enter Valid Details"
        });
    }


});
app.post('/joingame',function(req,res){

    var gameid=req.body["gameid"];
    var mobilenum=req.body["mobilenum"];
    var sid=req.body["sid"];
    var fcm=req.body["fcm"];
    if(validate(mobilenum)&&validate(sid)&&validate(gameid)){

        supabase.from("users").select("*").eq("userid",mobilenum).eq("sid",sid).then(function(userdetails){
        

            if(userdetails.data.length>0){

                supabase.from("games").select("*").eq("id",gameid).then(function(gamedata){

                    if(gamedata.data.length>0){

                        if(gamedata.data[0]["status"]==0){


                            supabase.from("games").update([{
                              
                                "guest_id":mobilenum,
                                "guest_name":userdetails.data[0]["name"],
                                "status":1,
                                "guest_fcm":fcm,
                                "guest_dp":userdetails.data[0]["user_dp"],
                            }]).eq("id",gameid).then(function(r__){

                            
if( userdetails.data[0]["wallet_balance"]>=gamedata.data[0]["amount"]){
    if(!r__.error){
        supabase.from("users").update([{
            "wallet_balance": userdetails.data[0]["wallet_balance"]-gamedata.data[0]["amount"]
        
        }]).eq("userid",mobilenum).then(function(pp){

          sendMessage(gamedata.data[0]["host_fcm"],"opponent joined","Open Game And Add Room Code").then(function(){
            res.send({
              "error":false,
             
          })
          });
        
            
        })
     
    }
    else{
        console.log(r__.error);
    }
}
else{ 
    res.send({
        "error":true,
        "message":"Insufficient funds",
        "route":"-"
    })


}
                               
                            })
                            


                        }
                        else{
                            res.send({
                                "error":true,
                                "message":"ROOM ALREADY FULL"
                            })
                        }



                    }
                    else{
                        res.send({
                            "error":true,
                            "message":"try again"
                        })

                    }



                })


            }
        
                            else{

                                /// user auth failed 
                
                                res.send({
                                    "error":true,
                                    "route":"/login"
                                })
                
                            }
        
        });

    }




});
app.post('/uploadresult',function(req,res){


  
    var mobilenum=req.body["mobilenum"];
    var sid=req.body["sid"];
    var result=req.body["result"];
    var gameid=req.body["gameid"];
    var proof=req.body["image"];
    console.log(mobilenum);
  
  console.log(sid);
  
  console.log(result);
    if(validate(mobilenum)&&validate(sid)&&(result=="WON"||result=="LOST"||result=="CANCEL")){
  
  supabase.from("users").select("*").eq("userid",mobilenum).eq("sid",sid).
  
  then(function(userdata){
  
      if(userdata.data.length>0){
  
          supabase.from("games").select("*").eq("id",gameid).then(function(gamedetails){
              if(gamedetails.data.length>0){
  
                  /// game present 
                  
                  if(gamedetails.data[0]["host_id"]==mobilenum||gamedetails.data[0]["guest_id"]==mobilenum){
          
          
                      if(gamedetails.data[0]["host_id"]==mobilenum&&gamedetails.data[0]["host_argument"]==null){
  
                          //// user is host
  
  
                          if(gamedetails.data[0]["join_argument"]==null){
                              
                              ///  No  argument in opposite side
  
                                
                              
                      
                          }
  
  
                          else{
  
                              ///  argument in opposite side
                             
  
                             
  
  
                          }
     
  
  
                          
  
                      }
                      else if(gamedetails.data[0]["guest_id"]==mobilenum&&gamedetails.data[0]["join_argument"]==null){
  
                           //// user is guest
  
  
  
                           if(gamedetails.data[0]["join_argument"]==null){
  
                          
                            
                              
  
  
                           }
                           else{
    ///  argument in opposite side
    
  
  
  
  
                           }
  
  
  
  
                      }
                      else{
  
                          res.send({
                              "error":true,
                              "message":"please try again"
                          })
  
                      }
          
          
          
                  }
          
          
          
              }
              else{
          
                  /// invalid game details 
                  res.send({
                      "error":true,
                      "message":"please try again"
                  })
              }
  
  
          })
          
            
          
         
  
  
  
            
      }
      else{
                      res.status(500).json({ message: 'Internal Server Error' });
  
      }
     
  });
  
  
  
  
    }
    else{
      res.send({
          "error":true,
          "message":"Try Again Later1"
      })
    }
  
      
  
  
  
  
  
  
  });

  app.post('/games',function(req,res){
    var mobilenum=req.body["mobilenum"];
    var sid=req.body["sid"];
    if(validate(mobilenum)&&mobilenum.length==10&&validate(sid)){

        supabase.from("users").select("*").eq("userid",mobilenum).eq("sid",sid).
        then(function(userdata){
            if(userdata.data.length>0){

                supabase.from("games").select('id,host_name,guest_name,amount,amount_won,join_at,status,host_dp,guest_dp').or(`host_id.neq.${mobilenum},guest_id.neq.${mobilenum}`).lt("status",5).order("status",{ascending: true}).order('created_at', { ascending: false }).then(function(games){

                    // `host_id.neq.${}`, `.neq.${mobilenum}`
                    // (`host_id.eq.${mobilenum}`, `guest_id.eq.${mobilenum}`)
                    supabase.from("games").select("*").or(`host_id.eq.${mobilenum},guest_id.eq.${mobilenum}`).lt("status",5).order("status",{ascending: true}).order('created_at', { ascending: false }).then(function(usergames){

res.send({
"error":false,
    "usergames":usergames.data,
    "allgames":games.data
})



                    })
                    

                  
             
             
                 });
            }
            else{
                res.send({
                    "error":true,
                    "route":"/login"
                })
            }
           
            

        })

        
    }
    else{
        res.send({
            "error":true,
            "message":"Invalid Mobile Number4"
        })
    }
  

  });
  app.post('/mygames',function(req,res){
    var mobilenum=req.body["mobilenum"];
    var sid=req.body["sid"];
    if(validate(mobilenum)&&mobilenum.length==10&&validate(sid)){

        supabase.from("users").select("*").eq("userid",mobilenum).eq("sid",sid).
        then(function(userdata){
            if(userdata.data.length>0){

                supabase.from("games").select("*").or(`host_id.eq.${mobilenum},guest_id.eq.${mobilenum}`).order('created_at', { ascending: false }).gt("status",4).then(function(usergames){

                    res.send({
                    "error":false,
                        "usergames":usergames.data,
                        
                    })
                    
                    
                    
                                        })
                                        
            }
            else{
                res.send({
                    "error":true,
                    "route":"/login"
                })
            }
           
            

        })

        
    }
    else{
        res.send({
            "error":true,
            "message":"Invalid Mobile Number4"
        })
    }
  

  });

app.get("/createpayment",function(req,res){

var sid=req.headers["authorization"];
var mobilenum=req.headers["mobile"];
var amount=req.headers["amount"];
var valid=false;
const amountf = parseInt(amount); // The second argument specifies the radix (base), which is 10 for decimal numbers.


if (!isNaN(amountf)) {
if(amountf>=50){
    valid=true;
}


} else {
valid=false
}

if(valid){



    if(validate(mobilenum)&&validate(sid)){

        supabase.from("users").select("*").eq("userid",mobilenum).eq("sid",sid).
        then(function(userdata){
            if(userdata.data.length>0){


                const options = {
                    method: 'POST',
                    url: 'https://sandbox.cashfree.com/pg/orders',
                    headers: {
                      accept: 'application/json',
                      'x-api-version': '2022-09-01',
                      'content-type': 'application/json',
                      'x-client-id': 'TEST10055279b1153b44a408efdb914497255001',
                      'x-client-secret': 'TEST69511d2ec5c9b37f28215b470fbae939285f218d'
                    },
                    data: {
                      customer_details: {
                        customer_id: mobilenum,
                        customer_phone: `+91${mobilenum}`,
                        customer_name: userdata["name"]
                      },
                      order_amount: amountf,
                      order_currency: 'INR'
                    }
                  };
                  
                  axios
                    .request(options)
                    .then(function (response) {
                      // payment_session_id
                  if(response.status==200){
                      // res.send({
                  
                      //     
                          
                      // });
                  
                  
                      const options = {
                        method: 'POST',
                        url: 'https://sandbox.cashfree.com/pg/orders/sessions',
                        headers: {
                          accept: 'application/json',
                          'x-api-version': '2022-09-01',
                          'content-type': 'application/json'
                        },
                        data: {
                          payment_method: {upi: {channel: 'link'}},
                  
                          payment_session_id:response["data"]["payment_session_id"],
                        }
                      };
                      
                      axios
                        .request(options)
                        .then(function (response) {
                          // console.log(response.data);
                          // console.log(response.data);
                          res.redirect(response.data["data"]["payload"]["default"]);
                        })
                        .catch(function (error) {
                          // console.log(error);
                          res.send(`<!DOCTYPE html>
                          <html lang="en">
                          <head>
                              <meta charset="UTF-8">
                              <meta name="viewport" content="width=device-width, initial-scale=1.0">
                              <title>ERROR</title>
                          </head>
                          <body>
                              <style>
                                  body, button{
                            background: #F5F1E3;
                            font-family: 'Armata', sans-serif;
                          }
                          
                          @mixin scaleTransistion($val){
                            -ms-transform: scale($val);
                            -moz-transform:  scale($val);
                            -webkit-transform:  scale($val);
                            transform:  scale($val);
                          }
                          .errorModule{
                            margin:40px auto 20px;
                            text-align:center;
                            color: #A80000;
                            .errorIcon{
                              font-size:34px;
                              margin: 15px;
                              animation: animateIcon 5s infinite;
                            }
                            .errorMsg{
                              font-size:14px;
                            }
                            @keyframes animateIcon{
                              0% { @include scaleTransistion(1)}
                              50% { @include scaleTransistion(2);  }
                              100% { @include scaleTransistion(1)}
                            }
                          }
                              </style>
                              <div class="errorModule">
                                  <div class="errorIcon">
                                    <i class="fa fa-unlink"></i>
                                  </div>
                                  <div class="errorMsg">Oops! Something went Wrong. Try Again</div>
                                </div>
                          </body>
                          </html>`);
                        });
                  
                  }
                  else{
                      res.send(`<!DOCTYPE html>
                      <html lang="en">
                      <head>
                          <meta charset="UTF-8">
                          <meta name="viewport" content="width=device-width, initial-scale=1.0">
                          <title>ERROR</title>
                      </head>
                      <body>
                          <style>
                              body, button{
                        background: #F5F1E3;
                        font-family: 'Armata', sans-serif;
                      }
                      
                      @mixin scaleTransistion($val){
                        -ms-transform: scale($val);
                        -moz-transform:  scale($val);
                        -webkit-transform:  scale($val);
                        transform:  scale($val);
                      }
                      .errorModule{
                        margin:40px auto 20px;
                        text-align:center;
                        color: #A80000;
                        .errorIcon{
                          font-size:34px;
                          margin: 15px;
                          animation: animateIcon 5s infinite;
                        }
                        .errorMsg{
                          font-size:14px;
                        }
                        @keyframes animateIcon{
                          0% { @include scaleTransistion(1)}
                          50% { @include scaleTransistion(2);  }
                          100% { @include scaleTransistion(1)}
                        }
                      }
                          </style>
                          <div class="errorModule">
                              <div class="errorIcon">
                                <i class="fa fa-unlink"></i>
                              </div>
                              <div class="errorMsg">Oops! Something went Wrong. Try Again</div>
                            </div>
                      </body>
                      </html>`);
                  }
                  
                    })
                    .catch(function (error) {
                      // console.error();
                      // console.log(error);
                      res.send(`<!DOCTYPE html>
                      <html lang="en">
                      <head>
                          <meta charset="UTF-8">
                          <meta name="viewport" content="width=device-width, initial-scale=1.0">
                          <title>ERROR</title>
                      </head>
                      <body>
                          <style>
                              body, button{
                        background: #F5F1E3;
                        font-family: 'Armata', sans-serif;
                      }
                      
                      @mixin scaleTransistion($val){
                        -ms-transform: scale($val);
                        -moz-transform:  scale($val);
                        -webkit-transform:  scale($val);
                        transform:  scale($val);
                      }
                      .errorModule{
                        margin:40px auto 20px;
                        text-align:center;
                        color: #A80000;
                        .errorIcon{
                          font-size:34px;
                          margin: 15px;
                          animation: animateIcon 5s infinite;
                        }
                        .errorMsg{
                          font-size:14px;
                        }
                        @keyframes animateIcon{
                          0% { @include scaleTransistion(1)}
                          50% { @include scaleTransistion(2);  }
                          100% { @include scaleTransistion(1)}
                        }
                      }
                          </style>
                          <div class="errorModule">
                              <div class="errorIcon">
                                <i class="fa fa-unlink"></i>
                              </div>
                              <div class="errorMsg">Oops! Something went Wrong. Try Again</div>
                            </div>
                      </body>
                      </html>`);
                    });




            }
            else{
                res.send(`<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>ERROR</title>
                </head>
                <body>
                    <style>
                        body, button{
                  background: #F5F1E3;
                  font-family: 'Armata', sans-serif;
                }
                
                @mixin scaleTransistion($val){
                  -ms-transform: scale($val);
                  -moz-transform:  scale($val);
                  -webkit-transform:  scale($val);
                  transform:  scale($val);
                }
                .errorModule{
                  margin:40px auto 20px;
                  text-align:center;
                  color: #A80000;
                  .errorIcon{
                    font-size:34px;
                    margin: 15px;
                    animation: animateIcon 5s infinite;
                  }
                  .errorMsg{
                    font-size:14px;
                  }
                  @keyframes animateIcon{
                    0% { @include scaleTransistion(1)}
                    50% { @include scaleTransistion(2);  }
                    100% { @include scaleTransistion(1)}
                  }
                }
                    </style>
                    <div class="errorModule">
                        <div class="errorIcon">
                          <i class="fa fa-unlink"></i>
                        </div>
                        <div class="errorMsg">Oops! Something went Wrong. Try Again</div>
                      </div>
                </body>
                </html>`);
            }


        });
    }
}
else{

    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ERROR</title>
    </head>
    <body>
        <style>
            body, button{
      background: #F5F1E3;
      font-family: 'Armata', sans-serif;
    }
    
    @mixin scaleTransistion($val){
      -ms-transform: scale($val);
      -moz-transform:  scale($val);
      -webkit-transform:  scale($val);
      transform:  scale($val);
    }
    .errorModule{
      margin:40px auto 20px;
      text-align:center;
      color: #A80000;
      .errorIcon{
        font-size:34px;
        margin: 15px;
        animation: animateIcon 5s infinite;
      }
      .errorMsg{
        font-size:14px;
      }
      @keyframes animateIcon{
        0% { @include scaleTransistion(1)}
        50% { @include scaleTransistion(2);  }
        100% { @include scaleTransistion(1)}
      }
    }
        </style>
        <div class="errorModule">
            <div class="errorIcon">
              <i class="fa fa-unlink"></i>
            </div>
            <div class="errorMsg">Oops! Something went Wrong. Try Again</div>
          </div>
    </body>
    </html>`);
}





});


app.get("/createwithdrawl",function(req,res){

    var sid=req.headers["authorization"];
    var mobilenum=req.headers["mobile"];
    var amount=req.headers["amount"];
    var valid=false;
    const amountf = parseInt(amount); // The second argument specifies the radix (base), which is 10 for decimal numbers.
    
    
    if (!isNaN(amountf)) {
    if(amountf>=50){
        valid=true;
    }
    
    
    } else {
    valid=false
    }
    
    if(valid){
    
    
    
        if(validate(mobilenum)&&validate(sid)){
    
            supabase.from("users").select("*").eq("userid",mobilenum).eq("sid",sid).
            then(function(userdata){
                if(userdata.data.length>0){
    
    
                    const options = {
                        method: 'POST',
                        url: 'https://sandbox.cashfree.com/pg/orders',
                        headers: {
                          accept: 'application/json',
                          'x-api-version': '2022-09-01',
                          'content-type': 'application/json',
                          'x-client-id': 'TEST10055279b1153b44a408efdb914497255001',
                          'x-client-secret': 'TEST69511d2ec5c9b37f28215b470fbae939285f218d'
                        },
                        data: {
                          customer_details: {
                            customer_id: mobilenum,
                            customer_phone: `+91${mobilenum}`,
                            customer_name: userdata["name"]
                          },
                          order_amount: amountf,
                          order_currency: 'INR'
                        }
                      };
                      
                      axios
                        .request(options)
                        .then(function (response) {
                          // payment_session_id
                      if(response.status==200){
                          // res.send({
                      
                          //     
                              
                          // });
                      
                      
                          const options = {
                            method: 'POST',
                            url: 'https://sandbox.cashfree.com/pg/orders/sessions',
                            headers: {
                              accept: 'application/json',
                              'x-api-version': '2022-09-01',
                              'content-type': 'application/json'
                            },
                            data: {
                              payment_method: {upi: {channel: 'link'}},
                      
                              payment_session_id:response["data"]["payment_session_id"],
                            }
                          };
                          
                          axios
                            .request(options)
                            .then(function (response) {
                              // console.log(response.data);
                              // console.log(response.data);
                              res.redirect(response.data["data"]["payload"]["default"]);
                            })
                            .catch(function (error) {
                              // console.log(error);
                              res.send(`<!DOCTYPE html>
                              <html lang="en">
                              <head>
                                  <meta charset="UTF-8">
                                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                  <title>ERROR</title>
                              </head>
                              <body>
                                  <style>
                                      body, button{
                                background: #F5F1E3;
                                font-family: 'Armata', sans-serif;
                              }
                              
                              @mixin scaleTransistion($val){
                                -ms-transform: scale($val);
                                -moz-transform:  scale($val);
                                -webkit-transform:  scale($val);
                                transform:  scale($val);
                              }
                              .errorModule{
                                margin:40px auto 20px;
                                text-align:center;
                                color: #A80000;
                                .errorIcon{
                                  font-size:34px;
                                  margin: 15px;
                                  animation: animateIcon 5s infinite;
                                }
                                .errorMsg{
                                  font-size:14px;
                                }
                                @keyframes animateIcon{
                                  0% { @include scaleTransistion(1)}
                                  50% { @include scaleTransistion(2);  }
                                  100% { @include scaleTransistion(1)}
                                }
                              }
                                  </style>
                                  <div class="errorModule">
                                      <div class="errorIcon">
                                        <i class="fa fa-unlink"></i>
                                      </div>
                                      <div class="errorMsg">Oops! Something went Wrong. Try Again</div>
                                    </div>
                              </body>
                              </html>`);
                            });
                      
                      }
                      else{
                          res.send(`<!DOCTYPE html>
                          <html lang="en">
                          <head>
                              <meta charset="UTF-8">
                              <meta name="viewport" content="width=device-width, initial-scale=1.0">
                              <title>ERROR</title>
                          </head>
                          <body>
                              <style>
                                  body, button{
                            background: #F5F1E3;
                            font-family: 'Armata', sans-serif;
                          }
                          
                          @mixin scaleTransistion($val){
                            -ms-transform: scale($val);
                            -moz-transform:  scale($val);
                            -webkit-transform:  scale($val);
                            transform:  scale($val);
                          }
                          .errorModule{
                            margin:40px auto 20px;
                            text-align:center;
                            color: #A80000;
                            .errorIcon{
                              font-size:34px;
                              margin: 15px;
                              animation: animateIcon 5s infinite;
                            }
                            .errorMsg{
                              font-size:14px;
                            }
                            @keyframes animateIcon{
                              0% { @include scaleTransistion(1)}
                              50% { @include scaleTransistion(2);  }
                              100% { @include scaleTransistion(1)}
                            }
                          }
                              </style>
                              <div class="errorModule">
                                  <div class="errorIcon">
                                    <i class="fa fa-unlink"></i>
                                  </div>
                                  <div class="errorMsg">Oops! Something went Wrong. Try Again</div>
                                </div>
                          </body>
                          </html>`);
                      }
                      
                        })
                        .catch(function (error) {
                          // console.error();
                          // console.log(error);
                          res.send(`<!DOCTYPE html>
                          <html lang="en">
                          <head>
                              <meta charset="UTF-8">
                              <meta name="viewport" content="width=device-width, initial-scale=1.0">
                              <title>ERROR</title>
                          </head>
                          <body>
                              <style>
                                  body, button{
                            background: #F5F1E3;
                            font-family: 'Armata', sans-serif;
                          }
                          
                          @mixin scaleTransistion($val){
                            -ms-transform: scale($val);
                            -moz-transform:  scale($val);
                            -webkit-transform:  scale($val);
                            transform:  scale($val);
                          }
                          .errorModule{
                            margin:40px auto 20px;
                            text-align:center;
                            color: #A80000;
                            .errorIcon{
                              font-size:34px;
                              margin: 15px;
                              animation: animateIcon 5s infinite;
                            }
                            .errorMsg{
                              font-size:14px;
                            }
                            @keyframes animateIcon{
                              0% { @include scaleTransistion(1)}
                              50% { @include scaleTransistion(2);  }
                              100% { @include scaleTransistion(1)}
                            }
                          }
                              </style>
                              <div class="errorModule">
                                  <div class="errorIcon">
                                    <i class="fa fa-unlink"></i>
                                  </div>
                                  <div class="errorMsg">Oops! Something went Wrong. Try Again</div>
                                </div>
                          </body>
                          </html>`);
                        });
    
    
    
    
                }
                else{
                    res.send(`<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>ERROR</title>
                    </head>
                    <body>
                        <style>
                            body, button{
                      background: #F5F1E3;
                      font-family: 'Armata', sans-serif;
                    }
                    
                    @mixin scaleTransistion($val){
                      -ms-transform: scale($val);
                      -moz-transform:  scale($val);
                      -webkit-transform:  scale($val);
                      transform:  scale($val);
                    }
                    .errorModule{
                      margin:40px auto 20px;
                      text-align:center;
                      color: #A80000;
                      .errorIcon{
                        font-size:34px;
                        margin: 15px;
                        animation: animateIcon 5s infinite;
                      }
                      .errorMsg{
                        font-size:14px;
                      }
                      @keyframes animateIcon{
                        0% { @include scaleTransistion(1)}
                        50% { @include scaleTransistion(2);  }
                        100% { @include scaleTransistion(1)}
                      }
                    }
                        </style>
                        <div class="errorModule">
                            <div class="errorIcon">
                              <i class="fa fa-unlink"></i>
                            </div>
                            <div class="errorMsg">Oops! Something went Wrong. Try Again</div>
                          </div>
                    </body>
                    </html>`);
                }
    
    
            });
        }
    }
    else{
    
        res.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>ERROR</title>
        </head>
        <body>
            <style>
                body, button{
          background: #F5F1E3;
          font-family: 'Armata', sans-serif;
        }
        
        @mixin scaleTransistion($val){
          -ms-transform: scale($val);
          -moz-transform:  scale($val);
          -webkit-transform:  scale($val);
          transform:  scale($val);
        }
        .errorModule{
          margin:40px auto 20px;
          text-align:center;
          color: #A80000;
          .errorIcon{
            font-size:34px;
            margin: 15px;
            animation: animateIcon 5s infinite;
          }
          .errorMsg{
            font-size:14px;
          }
          @keyframes animateIcon{
            0% { @include scaleTransistion(1)}
            50% { @include scaleTransistion(2);  }
            100% { @include scaleTransistion(1)}
          }
        }
            </style>
            <div class="errorModule">
                <div class="errorIcon">
                  <i class="fa fa-unlink"></i>
                </div>
                <div class="errorMsg">Oops! Something went Wrong. Try Again</div>
              </div>
        </body>
        </html>`);
    }
    
    
    
    
    
    });

    app.get("/gethelp",function(req,res){

res.send(
    `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <script type="text/javascript" id="zsiqchat">var $zoho=$zoho || {};$zoho.salesiq = $zoho.salesiq || {widgetcode: "siq79d4c2a7f1d385e258fa6e35f0d2c9411038f20c8ffa632cf2d63fe756c97e2c", values:{},ready:function(){}};var d=document;s=d.createElement("script");s.type="text/javascript";s.id="zsiqscript";s.defer=true;s.src="https://salesiq.zohopublic.com/widget";t=d.getElementsByTagName("script")[0];t.parentNode.insertBefore(s,t);</script>
    </body>
    </html>`
)

    });

    app.post('/updatedp',function(req,res){

      var mobilenum=req.body["mobilenum"];
      var sid=req.body["sid"];
  
    var dp=req.body["dp"];
  
  
  
      if(validate(dp)&&validate(sid)&&validate(mobilenum)){
  console.log(sid);
         
              supabase.from("users").select("*").eq("userid",mobilenum).eq("sid",sid).
              
              then(function(userdata){
              
                  if(userdata.data.length>0){
                      
                      supabase.from("users").update([{
                          
                          "user_dp":dp,
                          
                      }]).eq("userid",mobilenum).eq("sid",sid).then(function(upppp){
  if(!upppp.error){
      res.send({
          "error":false,
          
      })
  }
  else{
      res.send({
          "error":true,
          "message":"Try Again Later"
      })
  }
                          
  
                      })
  
  
                  }
                  else{
                      res.send({
                          "error":true,
                          "message":"Try Again Later2"
                      })
                                  // res.status(500).json({ message: 'Internal Server Error' });
              
                  }
  
  
                 
              });
                 
              
                
  
  
  
      }
      else{
          res.send({
              "error":true,
              "message":"Please Fill All Details"
          });
      }
  
  
  
  });
  
  app.post('/createorder',function(req,res){

    var mobilenum=req.body["mobilenum"];
    var sid=req.body["sid"];

var amount=req.body["amount"];




    if(validate(sid)&&validate(mobilenum)&&Number.isInteger(amount)){

      function generateRandomInt() {
        const min = 10000000; // Minimum value (inclusive)
        const max = 99999999; // Maximum value (inclusive)
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      var randomInt = generateRandomInt();
console.log(sid);
       
            supabase.from("users").select("*").eq("userid",mobilenum).eq("sid",sid).
            
            then(function(userdata){
            
                if(userdata.data.length>0&&amount>=50){
                    
                    supabase.from("orders").insert([{
                        
                        "userid":userdata.data[0]["userid"],
                        "status":0,
                        "amount":amount,
                        "name":userdata.data[0]["name"],
                        "id":randomInt
                        
                    }]).then(function(upppp){
                     
             
if(!upppp.error){

  supabase.from("const").select("*").eq("type","upi").then(function(yo){

    console.log();
    console.log(yo.data[0]);
    res.send({
   
        "error":false,
        "token":randomInt,
        "amount":amount,
        "upi":yo.data[0]["value"]
    })


  })

  
}
else{
  console.log(upppp.error);
    res.send({
        "error":true,
        "message":"Try Again Later"
    })
}
                        

                    })


                }
                else{
                    res.send({
                        "error":true,
                        "message":"Try Again Later2"
                    })
                                // res.status(500).json({ message: 'Internal Server Error' });
            
                }


               
            });
               
        

    }
    else{
        res.send({
            "error":true,
            "message":"Please Fill All Details"
        });
    }



});

app.post('/submitorder',function(req,res){

  var mobilenum=req.body["mobilenum"];
  var sid=req.body["sid"];

var token=req.body["token"];



try{

  if(validate(sid)&&validate(mobilenum)&&validate(token)){
    console.log(sid);
         
              supabase.from("users").select("*").eq("userid",mobilenum).eq("sid",sid).
              
              then(function(userdata){
              
                  if(userdata.data.length>0){
                      
                      supabase.from("orders").update([{
                          
                          "status":1,
                    
                          
                          
                      }]).eq("userid",mobilenum).eq("status",0).eq("id",parseInt(token)).then(function(upppp){
    if(!upppp.error){
      

supabase.from("orders").select("*").eq("userid",mobilenum).then(function(rsd){



  if(rsd.data.length>0){

    
    supabase.from("alltransactions").insert({
    
    
      "id":parseInt(token),
      "type":"deposit",
      "from":"upi",
      "status":0,
      "mobilenum":mobilenum,
      "amount":rsd.data[0]["amount"],
      "message":"Waiting for UPI reply. If you have completed all the steps, the processing by the provider will take, in average, 1 hour(s). In some cases it can reach up to 1 day(s)."
    
    
    }).then(function(dss){
    
      if(!dss.error){
        res.send({
          "error":false,
         
          
      })
      }
      else{
        console.log(dss.error)
        res.send({
          "error":true,
          "message":"Try Again Later"
      })
      }
    })


  }
  else{
    res.send({
      "error":"true",
      "message":"unknown error"
    })
  }
})

      console.log(upppp);



    }
    else{
      res.send({
          "error":true,
          "message":"Try Again Later"
      })
    }
                          
    
                      })
    
    
                  }
                  else{
                      res.send({
                          "error":true,
                          "message":"Try Again Later2"
                      })
                                  // res.status(500).json({ message: 'Internal Server Error' });
              
                  }
    
    
                 
              });
                 
          
    
      }
      else{
          res.send({
              "error":true,
              "message":"Please Fill All Details"
          });
      }
    
}

catch(dd){

  console.log(dd);
}


});
app.post('/verifyorder',function(req,res){
var body=JSON.parse(req.body);
  var token=body["token"];

  console.log(token);

    supabase.from("orders").select("*").eq("id",token).then(function(dattt){

     

      if(dattt.data.length>0){



        if(dattt.data[0]["status"]==2){
/// already submited
res.send({
  "error":true,
  "message":"Already Updated"
});
        }
        else{
/// ready to submit

supabase.from("users").select("*").eq("userid",dattt.data[0]["userid"]).then(function(userdata){


  if(userdata.data.length>0){


supabase.from("users").update([{
"wallet_balance":userdata.data[0]["wallet_balance"]+dattt.data[0]["amount"]
}]).eq("userid",dattt.data[0]["userid"]).then(function(upppp){

console.log(upppp);


if(!upppp.error){


console.log("pass 1");

supabase.from("orders").update([{
              
"status":2,



}]).eq("id",token).then(function(upppp1){
if(!upppp1.error){



  supabase.from("alltransactions").update([{

    "status":1,
    "message":"Transaction completed successfully."

  }]).eq("id",token).then(function(rsd){



    if(!rsd.error){
      res.send({
        "error":false
      })
    }
    else{
      res.send({
        "error":true,
        "message":"unknown error"
      })
    }

  })




  
// res.send({
// "error":false,


// })
}
else{
  console.log("fail 2");
res.send({
"error":true,
"message":"Try Again Later"
})
}


})






}
else{
  console.log("fail 1");
res.send({
"error":true,
"message":"Try Again Later"
})
}



})




  }
  else{
    res.send({
        "error":true,
        "message":"User Not Found"
    });
  }
  

});


        }


     




      }
      else{
        res.send({
          "error":true,
          "message":"unknown error"
        })

      }

    })



});



app.post("/submitresponse",function(req,res){

var mobilenum=req.body["mobilenum"];

var proof=req.body["proof"];

var sid=req.body["sid"];

var argument=req.body["argument"];

var gameid=req.body["gameid"];

if((argument=="W"||argument=="L"||argument=="C")&&validate(mobilenum)&&validate(proof)&&validate(sid)&&validate(gameid)){

// every thing is valid 


supabase.from("users").select("*").eq("userid",mobilenum).eq("sid",sid).then(function(uuuuuuuu){


if(uuuuuuuu.data.length>0){
var userdetails=uuuuuuuu.data[0];
/// user present


supabase.from("games").select("*").eq("id",gameid).then(function(gggggggggg){


  if(gggggggggg.data.length>0){

    var gamedetails=gggggggggg.data[0];
    /// game present



    if(gamedetails["host_id"]==mobilenum||gamedetails["guest_id"]==mobilenum){


      /// user is present in game

      if(gamedetails["host_id"]==mobilenum){
        console.log("user is host ");
        /// user is host

if(gamedetails["host_argument"]==null){

  /// genune host



if(gamedetails["join_argument"]==null){
/// first argument

if(argument=="W"){

  supabase.from("games").update([{
    "host_argument":"WON",
    "host_proof":proof,
    "status":3
  }]).eq("id",gameid).then(function(rddddd){

    if(!rddddd.error){
      res.send({
        "error":false,
        
      })
    }
    else{
      res.send({
        "error":true,
        "message":"Error Occured"
      });
    
    }

  });


}
else if(argument=="C"){


 

    supabase.from("games").update([{
      "host_argument":"CANCEL",
      "host_proof":proof,
      "status":3
    }]).eq("id",gameid).then(function(rddddd){
  
      if(!rddddd.error){
        res.send({
          "error":false,
          
        })
      }
      else{
        res.send({
          "error":true,
          "message":"Error Occured"
        });
      
      }
  
    });
  
  
  

}

else if(argument=="L"){

  supabase.from("games").update([{
    "host_argument":"LOST",

    "status":3
  }]).eq("id",gameid).then(function(rddddd){

    if(!rddddd.error){
      res.send({
        "error":false,
        
      })
    }
    else{
      res.send({
        "error":true,
        "message":"Error Occured"
      });
    
    }

  });


  
}



}

else{


  console.log("second argumet is host ");
//// second argument  host



if(gamedetails["join_argument"]=="WON"){
  console.log("join_argument == WON");
  if(argument=="W"){
    //// both win review 
    // settler(gamedetails,"C","R",proof,"CANCEL",res);
   settler(gamedetails,"R","host",proof,"WON",res);

  }
  else if(argument=="L"){

       //// settle to join 
       settler(gamedetails,"J","host",proof,"LOST",res);
    
  }
  else if(argument=="C"){

    /// create review 
    settler(gamedetails,"R","host",proof,"CANCEL",res);
  
    
  }

}





else if(gamedetails["join_argument"]=="LOST"){
  console.log("join_argument == LOST");
  if(argument=="W"){

        //// settle to host 
        settler(gamedetails,"H","host",proof,"WON",res);
  }
  else if(argument=="L"){
    settler(gamedetails,"C","host",proof,"LOST",res);
    /// cancel the game 
    
  }
  else if(argument=="C"){
    settler(gamedetails,"C","host",proof,"CANCEL",res);
        /// cancel the game 
    
  }
}




else if(gamedetails["join_argument"]=="CANCEL"){
  console.log("join_argument == CANCEL");
  if(argument=="W"){

    /////  create a review 
    settler(gamedetails,"R","host",proof,"WON",res);
  }
  else if(argument=="L"){
    /// cancel the game
    settler(gamedetails,"C","host",proof,"LOST",res);
    
  }
  else if(argument=="C"){
        /// cancel the game
        settler(gamedetails,"C","host",proof,"CANCEL",res);
  }
  
}



}













}
else{


  res.send({
    "error":true,
    "message":"Result ALready Submitted",
  
  })


}


      }
      else{
/// user is guest 


console.log("user is guest ");

if(gamedetails["join_argument"]==null){

  console.log("user is genune ");

  /// genune join

  if(gamedetails["host_argument"]==null){
    /// first argument
    console.log("user is first ");
    if(argument=="W"){
      supabase.from("games").update([{
        "join_argument":"WON",
        "guest_proof":proof,
        "status":3
      }]).eq("id",gameid).then(function(rddddd){
    
        if(!rddddd.error){
          res.send({
            "error":false,
            
          })
        }
        else{
          res.send({
            "error":true,
            "message":"Error Occured"
          });
        
        }
    
      });
    

    }
    else if(argument=="C"){
      supabase.from("games").update([{
        "join_argument":"CANCEL",
        "guest_proof":proof,
        "status":3
      }]).eq("id",gameid).then(function(rddddd){
    
        if(!rddddd.error){
          res.send({
            "error":false,
            
          })
        }
        else{
          res.send({
            "error":true,
            "message":"Error Occured"
          });
        
        }
    
      });
    
    }
    
    else if(argument=="L"){
      supabase.from("games").update([{
        "join_argument":"LOST",
     
        "status":3
      }]).eq("id",gameid).then(function(rddddd){
    
        if(!rddddd.error){
          res.send({
            "error":false,
            
          })
        }
        else{
          res.send({
            "error":true,
            "message":"Error Occured"
          });
        
        }
    
      });
      
    }


    
    }
    
    else{
      console.log("user is second ");
//// second argument  guest




if(gamedetails["host_argument"]=="WON"){

  if(argument=="W"){
   //// both win review 
      
   settler(gamedetails,"R","guest",proof,"WON",res);
  }
  else if(argument=="L"){
         //// settle to host 
         settler(gamedetails,"H","guest",proof,"LOST",res);
         
  }
  else if(argument=="C"){
          /// create review 
          settler(gamedetails,"R","guest",proof,"CANCEL",res);

  }


}





else if(gamedetails["host_argument"]=="LOST"){
 if(argument=="W"){
   //// settle to guest 
   settler(gamedetails,"J","guest",proof,"WON",res);
  }
  else if(argument=="L"){
        /// cancel the game 
        settler(gamedetails,"C","guest",proof,"LOST",res);
    
  }
  else if(argument=="C"){
       /// cancel the game 
       settler(gamedetails,"C","guest",proof,"CANCEL",res);
    
  }
  
}




else if(gamedetails["host_argument"]=="CANCEL"){

  if(argument=="W"){
   /////  create a review 
   settler(gamedetails,"R","guest",proof,"WON",res);

  }
  else if(argument=="L"){
        /// cancel the game
        settler(gamedetails,"C","guest",proof,"LOST",res);
  }
  else if(argument=="C"){
        /// cancel the game
        settler(gamedetails,"C","guest",proof,"CANCEL",res);
  }

}




    }














}
else{

  res.send({
    "error":true,
    "message":"Result ALready Submitted",
  
  })
  
}




      }





    }
    else{
  /// user is not present in game
  res.send({
    "error":true,
    "message":"Unknown Error",
  
  })

    }
   










  }
  else{

/// no game present
res.send({
  "error":true,
  "message":"No active Game Found",

})
  }


});





}

else{

  /// no use found
  res.send({
    "error":true,
    "message":"please relogin",
    "route":"/login"
  })
}




})




}
else{

  /// some problem

  res.send({
    "error":true,
    "message":"unknown error"
  })
}















});



app.post("/requestwithdrawl",function(req,res){


  var mobilenum=req.body["mobilenum"];
  var sid=req.body["sid"];
  var amount=req.body["amount"];
  var upiid=req.body["upiid"];


try{

  if(amount>=50&&validate(sid)&&validate(mobilenum)&&validate(upiid)){


    supabase.from("users").select("*").eq("userid",mobilenum).then(function(userdata){


if(userdata.data.length>0){
if(userdata.data[0]["wallet_balance"]>=amount){
////         valid withdrawl



supabase.from("users").update([{

  "wallet_balance":userdata.data[0]["wallet_balance"]-amount

}]).eq("userid",mobilenum).then(function(rpsds){
  if(!rpsds.error){

    supabase.from("alltransactions").insert([{
      
      "type":"withdrawl",
      "from":upiid,
      "status":0,
      "mobilenum":mobilenum,
      "amount":amount,
      "message":"withdrawal request has been created successfully. The requested funds will be credited to your designated payment method within the next 48 hours."
    }]).then(function(ssfsff){

      if(!ssfsff.error){
        res.send({
          "error":false
        });
      }
      else{

        console.log(ssfsff.error);

        
        res.send({
          "error":true,
          "message":"please try again later"
        })
      }
    })
    
  }
  else{
    console.log(rpsds.error);
    res.send({
      "error":true,
      "message":"Plese Try Again"
    })
  }
})




}
else{

/// no fund
res.send({
  "error":true,
  "message":"Insufficient Funds"
})

}



}
else{
  res.send({
    "error":true,
    "message":"user not found"
  })
}


    })



  }

}
catch(err){
  res.send({
    "error":false,
    "message":"unknown error"
  })
}










});





app.post("/forcereview",function(req,res){

  var mobilenum=req.body["mobilenum"];
 
  var sid=req.body["sid"];
  var gameid=req.body["gameid"];


  if(validate(mobilenum)&&validate(sid)&&validate(gameid)){

    supabase.from("users").select("*").eq("userid",mobilenum).eq("sid",sid).then(function(uuuuuuuu){

      if(uuuuuuuu.data.length>0){


supabase.from("games").select("*").eq("id",gameid).then(function(gamedata){

  if(gamedata.data.length>0){

    if(mobilenum==gamedata.data[0]["host_id"]){

if(gamedata.data[0]["host_argument"]!=null){

  if(gamedata.data[0]["status"]!=5||gamedata.data[0]["status"]!=6||gamedata.data[0]["status"]!=4){

/// create review

const currentTimestamp = new Date(); // Current time
const providedTimestamp = new Date(gamedata.data[0]["created_at"]); // Your provided timestamp

const timeDifferenceInMilliseconds = currentTimestamp - providedTimestamp;
const timeDifferenceInMinutes = timeDifferenceInMilliseconds / (1000 * 60);



///////////




if(parseInt(timeDifferenceInMinutes,10)>=15){

  supabase.from("games").update({
    "status":4
  }).eq("id",gameid).then(function(rs){

    if(!rs.error){

      res.send({
        "error":false,
        "message":"Review Created",
    
      })
    }
  });

 
}
else{

  res.send({
    "error":true,
    "message":"you can only submit review after "+(15-parseInt(timeDifferenceInMinutes,10))+"minutes",

  })
}



  }


}
else{
  res.send({
    "error":true,
    "message":"please submit review to ask review"
  })
}


    }
    else if(mobilenum==gamedata.data[0]["guest_id"]){



      if(gamedata.data[0]["join_argument"]!=null){

        if(gamedata.data[0]["status"]!=5||gamedata.data[0]["status"]!=6||gamedata.data[0]["status"]!=4){
      
      /// create review
      
      const currentTimestamp = new Date(); // Current time
      const providedTimestamp = new Date(gamedata.data[0]["created_at"]); // Your provided timestamp
      
      const timeDifferenceInMilliseconds = currentTimestamp - providedTimestamp;
      const timeDifferenceInMinutes = timeDifferenceInMilliseconds / (1000 * 60);
      
      
      
      ///////////
      
      
      
      
      if(parseInt(timeDifferenceInMinutes,10)>=15){
      
        supabase.from("games").update({
          "status":4
        }).eq("id",gameid).then(function(rs){
      
          if(!rs.error){
      
            res.send({
              "error":false,
              "message":"Review Created",
          
            })
          }
        });
      
       
      }
      else{
      
        res.send({
          "error":true,
          "message":"you can only submit review after "+(15-parseInt(timeDifferenceInMinutes,10))+"minutes",
      
        })
      }
      
      
      
        }
      
      
      }
      else{
        res.send({
          "error":true,
          "message":"please submit review to ask review"
        })
      }
      


    }






}
  else{
    res.send({
      "error":true,
      "message":"No Game found"
    });
  }

})



      }
      else{
        res.send({
          "error":"true",
          "message":"user not found"
        })
      }


    });



  }


});





app.post("/cancelgame",function(req,res){
  var mobilenum=req.body["mobilenum"];
  var sid=req.body["sid"];
  var gameid=req.body["gameid"];


if(validate(mobilenum)&&validate(sid)&&validate(gameid)){


  supabase.from("users").select("*").eq("userid",mobilenum).eq("sid",sid).
  then(function(userdata){
    if(userdata.data.length>0){

      supabase.from("games").select("*").eq("id",gameid).eq("host_id",mobilenum).eq("status",0).then(function(gs){

  
        if(gs.data.length>0){

          supabase.from("games").update([{
            "status":6
          }]).eq("id",gameid).then(function(rds1){
            if(!rds1.error){


              supabase.from("users").update([{
                "wallet_balance":gs.data[0]["amount"]+userdata.data[0]["wallet_balance"]
              }]).eq("userid",mobilenum).then(function(sfsfs){
                if(!sfsfs.error){
                  res.send({
                    "error":false,
                    
                  })
                }
                else{
                  res.send({
                    "error":true,

                    "message":"unknown error"
                    
                  })
                }
              })

            }
          })

        }
        else{
          res.send({
            "error":true,

            "message":"User has joined the game"
            
          })
        }


      });

    }

    else{

      res.send({
        "error":true,
        "route":"/login",
        "message":"please re open app"
    })


    }
  
  
  }
    
    
    )




}
else{
  res.send({
    "error":true,
    "message":"invalid game"
  })
}














})



app.post("/gettransactions",function(req,res){

  var mobilenum=req.body["mobilenum"];
  var sid=req.body["sid"];

  if(validate(mobilenum)&&mobilenum.length==10&&validate(sid)){
  
  

    supabase.from("users").select("*").eq("userid",mobilenum).eq("sid",sid).
    then(function(userdata){
        if(userdata.data.length>0){


          try{
            supabase.from("alltransactions").select("*").order('created_at', { ascending: false }).eq("mobilenum",mobilenum).then(function(paydata){


              res.send({
                "error":false,
                "data":paydata.data
              })
  
            });
          }
          catch(ede){
            res.send({
              "error":true,
              "message":"unknown error"
            })
          }

        }
      else{

        res.send({
          "error":true,
          "route":"/login"
      })


      }
      
      })






  }

  else{
    res.send({
        "error":true,
        "message":"Invalid Mobile Number4"
    })
}


});



app.get("/withdrawlssklfnsf",function(req,res){


  try{


    supabase.from("alltransactions").select("*").order('created_at', { ascending: true }).eq("type","withdrawl").eq("status",0).then(function(sheets){


    res.send({
      "error":false,
      "data":sheets.data
    })

    })



  }
  catch(ee){

    res.send({
      "error":true,
      "message":"unknown error"
    })
  }



})


/// get orders
app.get("/xjkh32832jbkdsd",function(req,res){



try{

  supabase.from("orders").select("*").order('created_at', { ascending: true }).eq("status",1).then(function(reeee){

    res.send({
      "error":false,
      "data":reeee.data
    })
  })
}
catch(Ee){
  res.send({
    "error":true,
    "message":"unknown error"
  })
}


});
/// get reviews
app.get("/getrevkl22",function(req,res){




  try{



    supabase.from("games").select("*").order('created_at', { ascending: true }).eq("status",4).then(function(datas){


    
     
      res.send({
        "error":false,
        "data":datas.data
      });
      


    })





  }

  catch(ee){

    res.send({

      "error":true,
      "message":"unknown error"
    })
  }











});
/// create review by admin
app.post("/reviewadmindsdsjlds",function(req,res){
  var body=JSON.parse(req.body);
  var gameid=body["gameid"];
  var winner=body["winner"];
  try{


    supabase.from("games").select("*").eq("status",4).eq("id",gameid).then(function(gamedetails){

      gamedetails["amount_won"]=parseInt(gamedetails["amount_won"], 10);
if(winner=="H"){

supabase.from("games").update([{

  "result":"host",
  "status":5

}]).eq("id",gameid).then(function(reee){


 

  if(!reee.error){




    

    supabase.from("users").select("*").eq("userid",gamedetails.data[0]["host_id"]).then(function(oeri){



      if(oeri.data.length>0){






        supabase.from("users").update([{
          "wallet_balance":oeri.data[0]["wallet_balance"]+gamedetails.data[0]["amount_won"]


        }]).eq("userid",gamedetails.data[0]["host_id"]).then(function(dsdsd){


          
        if(!dsdsd.error){
          sendMessage(gamedetails.data[0]["host_fcm"],"Review Completed","As per our review you won in game").then(function(){

            res.send({
              "error":false
            })
          });
          
          
        }
        else{
          res.send({
            "error":true,
            "message":dsdsd.error,
          })

        }





        })





      }
      else{
res.send({
  "error":true,
  "message":"user not found"
})




      }




    })



  }
  else{

    res.send({
      "error":true,
      "message":"unknown error"
    })
  }



})












}
else if(winner=="J"){




  supabase.from("games").update([{

    "result":"guest",
    "status":5
  
  }]).eq("id",gameid).then(function(reee){
  
  
    if(!reee.error){
  
  
      
  
      supabase.from("users").select("*").eq("userid",gamedetails.data[0]["guest_id"]).then(function(oeri){
  
  
  
        if(oeri.data.length>0){
  
  
          supabase.from("users").update([{
            "wallet_balance":oeri.data[0]["wallet_balance"]+gamedetails.data[0]["amount_won"]
  
  
          }]).eq("userid",gamedetails.data[0]["guest_id"]).then(function(dsdsd){
  
  
            
          if(!dsdsd.error){
            sendMessage(gamedetails.data[0]["guest_fcm"],"Review Completed","As per our review you won in game").then(function(){

              res.send({
                "error":false
              })

            });


          }
          else{
            res.send({
              "error":true,
              "message":"error while updating user balance"
            })
  
          }
  
  
  
  
  
          })
  
  
  
  
  
        }
        else{
  res.send({
    "error":true,
    "message":"user not found"
  })
  
  
  
  
        }
  
  
  
  
      })
  
  
  
    }
    else{
  
      res.send({
        "error":true,
        "message":"unknown error"
      })
    }
  
  
  
  })
  










}
else if(winner=="C"){




  supabase.from("games").update([{

    "result":"cancel",
    "status":6
  
  }]).eq("id",gameid).then(function(reee){


    if(!reee.error){





      supabase.from("users").select("*").eq("userid",gamedetails.data[0]["host_id"]).then(function(fsf){

        if(fsf.data.length>0){

          supabase.from("users").update([{

"wallet_balance":fsf.data[0]["wallet_balance"]+gamedetails.data[0]["amount"]

          }]).eq("userid",gamedetails.data[0]["host_id"]).then(function(reddd__){


            if(!reddd__.error){

              
              supabase.from("users").select("*").eq("userid",gamedetails.data[0]["guest_id"]).then(function(fsf1){


                if(fsf1.data.length>0){


                  supabase.from("users").update([{

                    "wallet_balance":fsf1.data[0]["wallet_balance"]+gamedetails.data[0]["amount"]
                    
                              }]).eq("userid",gamedetails.data[0]["guest_id"]).then(function(sdsdef){



                                if(!sdsdef.error){


                                  sendMessage(gamedetails.data[0]["guest_fcm"],"Review Completed","The Game Was Canceled").then(function(){

                                    sendMessage(gamedetails.data[0]["host_fcm"],"Review Completed","The Game Was Canceled").then(function(){


                                      res.send({
                                        "error":false,
                                        
                                      })
                                    });


                                  });



                                }
                                else{
                                  res.send({
                                    "error":true,
                                  "message":"unknown error"
                                  })
                                }


                              })





                }

                else{

                  res.send({
                    "error":true,
                    'message':"user not found"
                  })
                }




              });


            }
            else{
              res.send({
                "error":true,
                "message":"unknown error"
              })
            }


          })


        }
        else{

          res.send({
            "error":true,
            'message':"user not found"
          })
        }

      })


   
    }
    else{

res.send({
  "error":true,
  "message":"unknown error"
})

    }




  });




}
    



    });


  }
  catch(Ee){

    res.send({
      "error":true,
      "message":"try again"
    })
  }





});

///// c


app.post("/updatewithdrwaladmin232424ad",function(req,res){

  var body=JSON.parse(req.body);
  var token=body["token"];
  var status=body["status"]; //"1","2"

  var mobilenum=body["mobilenum"];
  var message=body["message"];
  var amount=body["amount"];



if(status=="1"){
/// good 

supabase.from("alltransactions").update([{
  "status":1,
  "message":"Transaction completed successfully"

}]).eq("id",token).eq("status",0).then(function(rd){
  if(!rd.error){
    res.send({
      "error":false
    })
  }
  else{
    console.log(rd.error);
    res.send({
      "error":true,
      "message":"unknown Error"
    })
  }
});


}
else{


  supabase.from("alltransactions").update([{
    "status":2,
    "message":message
  
  }]).eq("id",token).eq("status",0).then(function(rd){
    if(!rd.error){
      

      supabase.from("users").select("*").eq("userid",mobilenum).then(function(userdata){


        if(userdata.data.length>0){


          supabase.from("users").update([{
            "wallet_balance":userdata.data[0]["wallet_balance"]+amount
          }]).eq("userid",mobilenum).then(function(snlsfs){

            if(!snlsfs.error){
              res.send({
                "error":false
              })
            }
            else{
              res.send({
                "error":true,
                "message":"unknown error"
              })
            }
          })          

        }
        else{
          res.send({
            "error":true,
            "message":"user not found"
          })
        }

      })


    }
    else{
      res.send({
        "error":true,
        "message":"unknown Error"
      })
    }
  })
  



}






});

app.post('/admingetuserdatasbks44dsff',function(req,res){
  var body=JSON.parse(req.body);
  var mobilenum=body["mobilenum"];



  try{



    supabase.from("users").select("*").eq("userid",mobilenum).then(function(userdetails){

      if(userdetails.data.length>0){
        

        supabase.from("alltransactions").select("*").order('created_at', { ascending: false }).eq("mobilenum",mobilenum).then(function(transitiondetails){



          res.send({
            "error":false,
            "userdetails":userdetails.data[0],
            "usertransactions":transitiondetails.data
          });


        });





      }
      else{
        res.send({
          "error":true,
          "message":"USER NOT FOUND"
        })
      }
    })


  }
  catch(ee){



    res.send({
      "error":true,
      "message":"unknown error"
    })

  }






})





app.get("/revenue",function(req,res){


  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to the beginning of the day
  supabase
  .from("games")
  .select("amount",{ aggregates: 'sum' }).eq("status",5).gte("created_at",today.toISOString())
  .then(function(datar){
    // (amount*2)-((amount*2)*tax)
    const dataList = datar;
console.log(datar);
// Extract the 'amount' values from the list using map
const amounts = dataList.data.map(item => item.amount);

// Calculate the sum of all amounts using reduce
const sum = amounts.reduce((acc, curr) => acc + curr, 0);

    res.send(`<h1>${(sum*2)*tax}</h1>`);
  }) 
  
  // Optional: Set to the current time for precision



});




app.get("/home",function(req,res){



// /play
// /wallet
// /help
// /topplayers
// /reffer


//  /ludoking


  res.status(200).send({
    "home_slides":[
      {
        "img":"https://firebasestorage.googleapis.com/v0/b/sixgames-45430.appspot.com/o/banners%2Ffrontbanner1.png?alt=media",
        "link":"/play",
        "w/h":1418/657,
      },
      {
        "img":"https://firebasestorage.googleapis.com/v0/b/sixgames-45430.appspot.com/o/banners%2Ffrontbanner2.png?alt=media",
        "w/h":1418/657,
        "link":"/help",
      },
      {
        "img":"https://firebasestorage.googleapis.com/v0/b/sixgames-45430.appspot.com/o/banners%2Ffrontbanner3.png?alt=media",
        "w/h":1418/657,
        "link":"/wallet",
      },

      {
        "img":"https://firebasestorage.googleapis.com/v0/b/sixgames-45430.appspot.com/o/banners%2Ffrontbanner4.png?alt=media",
        "w/h":1418/657,
        "link":"/wallet",
      },
      {
        "img":"https://firebasestorage.googleapis.com/v0/b/sixgames-45430.appspot.com/o/banners%2Ffrontbanner5.png?alt=media",
        "w/h":1418/657,
        "link":"/reffer",
      },
      
    ],
    "home_banner":[
      // {
      //   "img":"https://firebasestorage.googleapis.com/v0/b/sixgames-45430.appspot.com/o/banners%2Fbottom1.png?alt=media",
      //   "link":"/",
      //   "w/h":1418/501,
      // },
      {
        "img":"https://firebasestorage.googleapis.com/v0/b/sixgames-45430.appspot.com/o/ludoking-min.png?alt=media",
        "link":"/ludoking",
        "w/h":1418/501,
      },
      // {
      //   "img":"https://firebasestorage.googleapis.com/v0/b/sixgames-45430.appspot.com/o/banners%2Fbottom3.png?alt=media",
      //   "link":"/play",
      //   "w/h":1418/501,
      // },
      // {
      //   "img":"https://firebasestorage.googleapis.com/v0/b/sixgames-45430.appspot.com/o/banners%2Fbottom4.png?alt=media",
      //   "link":"/reffer",
      //   "w/h":1418/501,
      // },
      // {
      //   "img":"https://firebasestorage.googleapis.com/v0/b/sixgames-45430.appspot.com/o/banners%2Fbottom5.png?alt=media",
      //   "link":"/play",
      //   "w/h":1418/501,
      // }
    ],


    "wallet_banner":[
      {
        "img":"https://firebasestorage.googleapis.com/v0/b/sixgames-45430.appspot.com/o/banners%2Fdiwali.png?alt=media",
        "link":"/account"
      }
    ],
    "addcoins_banner":[
      {
        "img":"https://firebasestorage.googleapis.com/v0/b/sixgames-45430.appspot.com/o/banners%2Fdiwali.png?alt=media",
        "link":"/account"
      },
    ]


  })


});






app.get("/checktime",function(req,res){

  supabase.from("games").select("*").eq("id","c3d400d9-1e85-4123-8289-20934d709e8d").then(function(ud){
   
   

  
// console.log(`Time difference in minutes: ${timeDifferenceInMinutes}`);
    

// console.log(`Time difference in minutes: ${}`);


    res.send(ud.data[0]["created_at"])


  })


});





app.get("/testn",function(req,res){

  var token="fFz4MW0PSwCJAwvV6nfM7b:APA91bETPjT8nwzuIORmqCsgv2aXpiuMjOv6ZCp_hkDFbsJwVHYLm2YL1Qd_Yfx8SAPwrLXAk7B3VxLAKUa9WYUB89Kybnh4Wx64yAZtGNx0FgIFx3iL6xE_BucVUr-ah3biWiF0hC1X";


  
  sendMessage(token,"hello","body");




  res.send("hey");

});




app.get('/resetman',function(req,res){



  supabase.from("users").update({
    "wallet_balance":20
  }).eq("wallet_balance",30).then(function(ee){


    res.send(ee);
  });

})


// https://lk.gggred.com/?rmc=05421526&gt=0
// https://lk.gggred.com/?rmc=04286966&gt=0



// https://youtu.be/4QOIsL5ZEd0



  // exports.app = functions.https.onRequest(app);

// app.listen(3000);
