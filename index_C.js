var servicetax=0.2;

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('./firebaseconfig.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const auth = admin.auth();

const { createClient } = require('@supabase/supabase-js');


// Provide a custom `fetch` implementation as an option
const supabase = createClient('https://dxthcumunhjmpalfbgxr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4dGhjdW11bmhqbXBhbGZiZ3hyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg2NDc4MDAsImV4cCI6MjAxNDIyMzgwMH0.sbpeGxXAsL8afNWlKqVjMhwZzG5B_qOyOc-pBZH377w', {});



const express = require('express');

const app = express();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

var urlencodedParser = bodyParser.urlencoded({ extended: false })

const cors = require('cors')({origin: true});
app.use(cors);

/// main get
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


// supabase.from("users").select("*").then(function(ress){
//     console.log(ress);
//     res.send("");
// })


var checkuser=async function(token){


  return await auth.verifyIdToken(token).catch(function(){
    return "fake"
  });

};

var checkuser_valid=function(user){

    if(user=="fake"){
        return "fake";
    }
    else{

        return user.uid;

    }

}





var validate=function (ss){
   if (ss!=null&&ss!=undefined&&ss!=""){
        return true
    }
    else{
        return false;
    }
}




var getdp=function(letter){

    var imageMap = {
        'a': 'url_for_a.jpg',
        'b': 'url_for_b.jpg',
    
        'v': 'url_for_c.jpg',

        'm': 'url_for_z.jpg'
    };
    if (imageMap.hasOwnProperty(letter)) {
        return imageMap[letter];
    } else {
        // If the letter is not in the map, you can return a default image URL or handle it as you see fit.
        return 'url_for_default_image.jpg';
    }
   
}







/////////////////// api start 

////// code for home fecth

app.post("/home",async function(req,res){


    


    
    var req__token=req.body["token"];
    if(req__token!=undefined&&req__token!="undefined"&&req__token!=""&&req__token!=null){
    
        var useruid=checkuser_valid(await checkuser("jjjj"));
    
    
    if(useruid!="fake"){
    
    /// no error
    supabase.from("users").select("*").eq('userid', useruid).then(function(ress){
    

        if(ress.body.length>0){

res.send({
"status":true,
"error":false,

"data":ress.body[0],
"offers":[],


})

        }
        else{
           
                res.send({
                    "status":false,
                    "error":false,
                    
                  
                    
                    })
             
        }

})

    
    }
    else{
        
            res.send({
              "error": true,
            })
      
    }
    
    }
    else{
        res.send({
            "error": true,
          })
    }




});





/////////////////  code for registation





app.post("/register",async function(req,res){


    


    
    var req__token=req.body["token"];
    if(req__token!=undefined&&req__token!="undefined"&&req__token!=""&&req__token!=null){
    
        var useruid=checkuser_valid(await checkuser("jjjj"));
    
    
    if(useruid!="fake"){
    
    /// no error
    supabase.from("users").select("*").eq('userid', useruid).then(async function(ress){
    

        if(ress.body.length>0){


var name=req.body["name"];
var name=req.body["name"];
var rf_code=req.body["rf_code"];
var user_dp=req.body["user_dp"];



if(validate(name)){

   supabase
    .from('users')
    .insert([
      { "userid": useruid, "name": name, "wallet_balance":0,"six_balance":0,

      "user_dp":validate(user_dp)?user_dp:getdp(name.charAt(0).toLowerCase()),
    
    },
    ])
    .select().then(function(resss){

if(ress.error){
    res.send({
        "status":false,
        "error":true,
        "message":"TRY AGAIN LATER"
        
      
        
        })
}
else{

    res.send({
        "status":true,
        "error":false,
        "message":"please fill required"
        
      
        
        })
    /// data updated sucesses 

}

    });

    

}
else{
    res.send({
        "status":false,
        "error":true,
        "message":"please fill required"
        
      
        
        })
}



        }
        else{
           
                res.send({
                    "status":false,
                    "error":false,
                    
                  
                    
                    })
             
        }

})

    
    }
    else{
        
            res.send({
              "error": true,
            })
      
    }
    
    }
    else{
        res.send({
            "error": true,
          })
    }




});





/////////////////  code for create game 


app.post("/creategame",async function(req,res){


    


    
    var req__token=req.body["token"];
    var amount=req.body["amount"];
    if(req__token!=undefined&&req__token!="undefined"&&req__token!=""&&req__token!=null){
    
        var useruid=checkuser_valid(await checkuser("jjjj"));
    
    
    if(useruid!="fake"){
    
    /// no error
    supabase.from("users").select("*").eq('userid', useruid).then(function(ress){
    

        if(ress.body.length>0){


         if(ress.body[0]["wallet_balance"]>=amount&&amount>10){

supabase.from("users").update({
    "wallet_balance":ress.body[0]["wallet_balance"]-amount
}).eq('userid', useruid).then(function(ress1){

    if(ress1.error){

        res.send({
            "status":false,
            "error":true,
            "message":"Try Again"                
            })



    }
    else{

        /// no error 
        supabase.from("games").insert([

            {
                "host_id":useruid,
                "host_name":ress.body[0]["name"],
                "amount":amount,
                "amount_won":(amount*2)*servicetax,
                "status":0,
                "host_dp":ress.body[0]["user_dp"],
            }

        ]).then(function(ress_2){

if(ress_2.error){

    res.send({
        "status":false,
        "error":true,
        "message":"UNKOWN ERROR"                
        })


}
else{

    res.send({
        "status":false,
        "roomid":ress_2.data["id"],
        "error":false, 
        })
}


        });



       
    }
})




         }
         else{
            res.send({
                "status":false,
                "error":true,
                "message":"insufficient Funds"                
                })
         }


        }
        else{
           
                res.send({
                    "status":false,
                    "error":true,
                    "message":"unkown error"
                    
                  
                    
                    })
             
        }

})

    
    }
    else{
        
            res.send({
              "error": true,
            })
      
    }
    
    }
    else{
        res.send({
            "error": true,
          })
    }




});

/////////////////  code for Play Ludo

app.post("/joingame",async function(req,res){


    


    
    var req__token=req.body["token"];
    var gameid=req.body["game_id"];
    if(validate(gameid)&&req__token!=undefined&&req__token!="undefined"&&req__token!=""&&req__token!=null){
    
        var useruid=checkuser_valid(await checkuser("jjjj"));
    
    
    if(useruid!="fake"){
    
    /// no error
    supabase.from("users").select("*").eq('userid', useruid).then(function(ress){
    

        if(ress.body.length>0){



            supabase.from("games").select("*").eq("id",gameid).then(function(ress1){



                if(ress1.error){
                
                    res.send({
                        "status":false,
                        "error":true,
                        "message":"unknown error",
                        
                      
                        
                        })
                }
                else{



                    if(ress.data[0]["wallet_balance"]>=ress1.data[0]["amount"]){

                        supabase.from("users").update({
                            "wallet_balance":ress.body[0]["wallet_balance"]-amount
                        }).eq('userid', useruid).then(function(ress1){


                            
                            if(ress1.error){

                                res.send({
                                    "status":false,
                                    "error":true,
                                    "message":"Try Again"                
                                    })
                        
                        
                        
                            }
                            else{
                        
                                /// no error 
                                supabase.from("games").insert([
                        
                                    {
                                        "guest_id":useruid,
                                        "guest_name":ress.body[0]["name"],
                                        "status":1,
                                        "guest_dp":ress.body[0]["user_dp"],
                                    }
                        
                                ]).then(function(ress_2){
                        
                        if(ress_2.error){
                        
                            res.send({
                                "status":false,
                                "error":true,
                                "message":"UNKOWN ERROR"                
                                })
                        
                        
                        }
                        else{
                        
                            res.send({
                                "status":false,
                                "roomid":ress_2.data["id"],
                                "error":false, 
                                })
                        }
                        
                        
                                });
                        
                        
                        
                               
                            }


                        })

                    }




                }


            });
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 



        }
        else{
           
                res.send({
                    "status":false,
                    "error":false,
                    
                  
                    
                    })
             
        }

})

    
    }
    else{
        
            res.send({
              "error": true,
            })
      
    }
    
    }
    else{
        res.send({
            "error": true,
          })
    }




});




////// code for play ludo




app.post("/playludo",async function(req,res){


    


    
    var req__token=req.body["token"];
   
    if(req__token!=undefined&&req__token!="undefined"&&req__token!=""&&req__token!=null){
    
        var useruid=checkuser_valid(await checkuser("jjjj"));
    
    
    if(useruid!="fake"){
    
    /// no error
    supabase.from("users").select("*").eq('userid', useruid).then(function(ress){
    

        if(ress.body.length>0){
            res.send({
                "status":true,
                "error":false,
                "mobile":ress.data[0]["name"],
                "wallet":"user_dp",

                
            
                })

         




        }
        else{
           
                res.send({
                    "status":false,
                    "error":false,
                    
                  
                    
                    })
             
        }

})

    
    }
    else{
        
            res.send({
              "error": true,
            })
      
    }
    
    }
    else{
        res.send({
            "error": true,
          })
    }




});



///// code for open game 





app.post("/opengame",async function(req,res){


    
var gameid=req.body["game_id"];
    var req__token=req.body["token"];
    if(validate(gameid)&&validate(req__token)){
    
        var useruid=checkuser_valid(await checkuser("jjjj"));
    
    
    if(useruid!="fake"){
    
    /// no error
    supabase.from("games").select("*").eq('id', gameid).then(function(ress){
    

        if(ress.body.length>0){

if(useruid==ress.body[0]["host_id"]||useruid==ress.body[0]["guest_id"]){
    res.send({
        "status":true,
        "error":false,
        
      "data":ress.body[0]
        
        })

}
else{
    res.send({
        "status":true,
        "error":true,
        
 "message":"unauthorized"
        
        })
}
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 



        }
        else{
           
                res.send({
                    "status":true,
                    "error":false,
                    
                  
                    
                    })
             
        }

})

    
    }
    else{
        
            res.send({
              "error": true,
            })
      
    }
    
    }
    else{
        res.send({
            "error": true,
          })
    }




});






////// code for cancel game 


app.post("/cancelgame",async function(req,res){


    


    
    var req__token=req.body["token"];
    var gameid=req.body["game_id"];
    if(validate(gameid)&&validate(req__token)){
    
        var useruid=checkuser_valid(await checkuser("jjjj"));
    
    
    if(useruid!="fake"){
    
    /// no error
    supabase.from("games").select("*").eq('id', gameid).then(function(ress){
    

        if(ress.body.length>0){



            if(ress.data[0]["status"]==0&&ress.data[0]["host_id"]==useruid){



                supabase.from("users").update({
                    "wallet_balance":ress.body[0]["wallet_balance"]+ress["amount"]
                }).eq('userid', useruid).then(function(ress1){
                
                    if(ress1.error){
                
                        res.send({
                            "status":false,
                            "error":true,
                            "message":"Try Again"                
                            })
                
                
                
                    }
                    else{
                
                        /// no error 
                        supabase.from("games").update([
                
                            {
                                
                               
                                "status":0,
                              
                            }
                
                        ]).eq('id', gameid).then(function(ress_2){
                
                if(ress_2.error){
                
                    res.send({
                        "status":true,
                        "error":true,
                        "message":"UNKOWN ERROR"                
                        })
                
                
                }
                else{
                
                    res.send({
                        "status":true,
                     
                        "error":false, 
                        })
                }
                
                
                        });
                
                
                
                       
                    }
                })

          

            }
            else{
                res.send({
                    "status":false,
                    "error":true,
                    "message":"Cant Cancel after join"
                    
                  
                    
                    })
            }





// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 



        }
        else{
           
                res.send({
                    "status":false,
                    "error":true,
                    "message":"Invalid game"
                    
                  
                    
                    })
             
        }

})

    
    }
    else{
        
            res.send({
              "error": true,
            })
      
    }
    
    }
    else{
        res.send({
            "error": true,
          })
    }




});





//////// code for submit room code 

app.post("/submitrc",async function(req,res){


    


    

    var req__token=req.body["token"];
    var roomid=req.body["roomcode"];
    var gameid=req.body["game_id"];

    if(validate(gameid)&&validate(roomid)&&validate(req__token)){
    
        var useruid=checkuser_valid(await checkuser("jjjj"));
    
    
    if(useruid!="fake"){
    
    /// no error
    supabase.from("games").select("*").eq('id', gameid).then(function(ress){
    

        if(ress.body.length>0){



         if(ress.data[0]["room_code"]==null||ress.data[0]["room_code"]==undefined||ress.data[0]["room_code"]==""){
            supabase.from("games").update([
                
                {
                    
                   
                    "status":2,
                    "room_code":roomid,
                  
                }
    
            ]).eq('id', gameid).then(function(ress_2){
    
    if(ress_2.error){
    
        res.send({
            "status":true,
            "error":true,
            "message":"UNKOWN ERROR"                
            })
    
    
    }
    else{
    
        res.send({
            "status":true,
         
            "error":false, 
            })
    }
    
    
            });
    


         }


// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 



        }
        else{
           
                res.send({
                    "status":false,
                    "error":false,
                    
                  
                    
                    })
             
        }

})

    
    }
    else{
        
            res.send({
              "error": true,
            })
      
    }
    
    }
    else{
        res.send({
            "error": true,
          })
    }




});





////////// Get Game History


app.post("/gamehistory",async function(req,res){


    


    
    var req__token=req.body["token"];
    if(validate(req__token)){
    
        var useruid=checkuser_valid(await checkuser("jjjj"));
    
    
    if(useruid!="fake"){
    
    /// no error
    supabase.from("games").select("*").or(`host_id.eq.${useruid}`, `guest_id.eq.${useruid}`).then(function(ress){
    

        if(ress.body.length>0){
            



res.send({
                    "status":true,
                    "error":false,
                    "data":ress.body
                    
                  
                    
                    });


// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 



        }
        else{
           
                res.send({
                    "status":true,
                    "error":true,
                    
                  
                    
                    })
             
        }

})

    
    }
    else{
        
            res.send({
              "error": true,
            })
      
    }
    
    }
    else{
        res.send({
            "error": true,
          })
    }




});



//////// code for get wallet

app.post("/getwallet",async function(req,res){


    


    
    var req__token=req.body["token"];
    if(validate(req__token)){
    
        var useruid=checkuser_valid(await checkuser("jjjj"));
    
    
    if(useruid!="fake"){
    
    /// no error
    supabase.from("users").select("*").eq('userid', useruid).then(function(ress){
    

        if(ress.body.length>0){


            res.send({
                "status":true,
                "error":true,
                "data":ress.data[0]
                })
         


// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 



        }
        else{
           
                res.send({
                    "status":true,
                    "error":true,
                    
                  
                    
                    })
             
        }

})

    
    }
    else{
        
            res.send({
              "error": true,
            })
      
    }
    
    }
    else{
        res.send({
            "error": true,
          })
    }




});
















































































////////////// code for submit result
app.post("/submitresult",async function(req,res){



     
    var req__token=req.body["token"];
    var gameid=req.body["game_id"];
    var result=req.body["result"];
    var proof=req.body["proof"];


    if((result=="WON"||result=="LOST"||result=="CANCEL")&&validate(req__token)){
    
        var useruid=checkuser_valid(await checkuser("jjjj"));
    
    
    if(useruid!="fake"){
    
    /// no error
    supabase.from("games").select("*").eq('id', gameid).then(function(gamedetails){
    

        if(gamedetails.body.length>0){

// c_1291

if(gamedetails.body[0]["join_argument"]!=null||gamedetails.body[0]["host_argument"]!=null){



    if(useruid==gamedetails.body[0]["host_id"]||useruid==gamedetails.body[0]["guest_id"]){

/// user is present in game


if(useruid==gamedetails.body[0]["host_id"]){

/// user is host 

if(gamedetails.body[0]["join_argument"]=="WIN"){

    /// block 1

if(result=="WIN"){



}
else if(result=="LOST"){


}
else if(result=="CANCEL"){

    
}

}

else if(gamedetails.body[0]["join_argument"]=="LOST"){

    /// block 2
    if(result=="WIN"){



    }
    else if(result=="LOST"){
    
    
    }
    else if(result=="CANCEL"){
    
        
    }

}
else if(gamedetails.body[0]["join_argument"]=="CANCEL"){

    /// block 3
    if(result=="WIN"){



    }
    else if(result=="LOST"){
    
    
    }
    else if(result=="CANCEL"){
    
        
    }

}

    
}
else{
//// user is guest 

if(gamedetails.body[0]["host_argument"]=="WIN"){

    /// block 1*
    if(result=="WIN"){


/// need review 



    }
    else if(result=="LOST"){
    //// send payment to host
    
    }
    else if(result=="CANCEL"){
    
        /// need review 

        
    }
}

else if(gamedetails.body[0]["host_argument"]=="LOST"){

    /// block 2*
    if(result=="WIN"){
 //// send payment to join


    }
    else if(result=="LOST"){
    //// send payment to bank

    
    }
    else if(result=="CANCEL"){
    /// send half payment to 
        
    }

}
else if(gamedetails.body[0]["host_argument"]=="CANCEL"){

    /// block 3*
    if(result=="WIN"){



    }
    else if(result=="LOST"){
    
    
    }
    else if(result=="CANCEL"){
    
        
    }
}


}










    }
    else{

        // user is not present in game


        res.send({
            "status":false,
            "error":true,
            "message":"unkown error"
            
            
            })

    }




}
else{


    // c_1292
    res.send({
        "status":false,
        "error":true,
        "message":"unkown error"
        
      
        
        })

    //// user already submited 

}


























        }
        else{
           
                res.send({
                    "status":false,
                    "error":true,
                    
                  
                    
                    })
             
        }

})

    
    }
    else{
        
            res.send({
              "error": true,
            })
      
    }
    
    }
    else{
        res.send({
            "error": true,
          })
    }

});




         
































 




























/////////////////// api end 






  exports.app = functions.https.onRequest(app);


