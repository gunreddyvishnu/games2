
const https = require('https');
const mqtt = require("mqtt");
// const crypto = require('crypto');

var tax = 0.08;
// var tax=0.10;
const crypto = require('crypto');
var bodyParser = require('body-parser')
const path = require('path');
const fs = require('fs');

var ObjectId = require('mongodb').ObjectId;
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
var upiid = "Q423557577@ybl";

var Minimum_Deposit=50;
var Minimum_Withdrawl=100;












const fastify = require('fastify');
const app = fastify();


const { error } = require('console');

// app.use(express.json());





const auth = admin.auth();

const { createClient } = require('@supabase/supabase-js');


// Provide a custom `fetch` implementation as an option
const supabase = createClient('https://dxthcumunhjmpalfbgxr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4dGhjdW11bmhqbXBhbGZiZ3hyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg2NDc4MDAsImV4cCI6MjAxNDIyMzgwMH0.sbpeGxXAsL8afNWlKqVjMhwZzG5B_qOyOc-pBZH377w', {});


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:Lr0EeMgmJUJJaAAG@sixgames.vap3vvs.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
var mongo = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
mongo.connect();
// Send a ping to confirm a successful connection
try {
  mongo.db("admin").command({ ping: 1 }).then(function () {
    console.log("You successfully connected to MongoDB!");
  }).catch(function () {
    console.log("Failed To connect DB");
  });

}
catch (ee) {

  console.log("Failed To connect DB");
}


const db = mongo.db("sixgames");

// //////////////////////////////////////////////// emqx //////////////////////////////////////////



const brokerOptions = {
  host: 'c47a4bf3.emqx.cloud',
  port: 1883, // MQTT over TCP Port
  protocol: 'mqtt', // Use 'mqtt' for TCP connection
  username: 'admin_server',
  password: 'a123g2madhu@G',
};

// Create an MQTT client
const client = mqtt.connect(brokerOptions);

// Handle connection events
client.on('connect', () => {
  console.log('Connected to MQTT broker');
});

client.on('error', (err) => {
  console.error('Error:', err);
});


function getRandomInt(min, max) {
  const range = max - min;
  const randomBytes = crypto.randomBytes(4); // Using 4 bytes for a 32-bit integer

  // Convert the random bytes to a number and scale to the desired range
  const randomNumber = Math.floor(
    (randomBytes.readUInt32LE(0) / 0xffffffff) * range
  ) + min;

  return randomNumber;
}


var player1path = [

  202,
  187,
  172,
  157,
  142,
  126,
  125,
  124,
  123,
  122,
  121,
  106,
  91,
  92,
  93,
  94,
  95,
  96,
  82,
  67,
  52,
  37,
  22,
  7,
  8,
  9,
  24,
  39,
  54,
  69,
  84,
  100,
  101,
  102,
  103,
  104,
  105,
  120,
  135,
  134,
  133,
  132,
  131,
  130,
  144,
  159,
  174,
  189,
  204,
  219,
  218,
  203,
  188,
  173,
  158,
  143,
  128


];

var player2path = [

  24,
  39,
  54,
  69,
  84,
  100,
  101,
  102,
  103,
  104,
  105,
  120,
  135,
  134,
  133,
  132,
  131,
  130,
  144,
  159,
  174,
  189,
  204,
  219,
  218,
  217,
  202,
  187,
  172,
  157,
  142,
  126,
  125,
  124,
  123,
  122,
  121,
  106,
  91,
  92,
  93,
  94,
  95,
  96,
  82,
  67,
  52,
  37,
  22,
  7,
  8,
  23,
  38,
  53,
  68,
  83,
  98




];






var projection_default = {
  "_id": 0
};



async function cancelgame(gamedetails) {

  var cancelstatus = await db.collection("games").updateOne({
    "id": gamedetails["id"],
    "status": gamedetails["status"]
  }, {
    "status": 4
  });


  if (cancelstatus["modifiedCount"] == 1) {


    ip = await updateBalance(gamedetails["player1"], gamedetails["stake"]);
    if (ip) {
      var pp = await updateBalance(gamedetails["player2"], gamedetails["stake"]);

      if (pp) {



        client.publish(`games/${gamedetails["gamechannel"]}`, JSON.stringify({


          "action": "cancel"

        }));

        //  game canceled we have to push in gameserve




      }
    }

  }
  else {
    return
  }


}


function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}


function generatereferal(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}



function validateHash(hash) {
  if (validate(hash)) {
    const parts = hash.split("###");

    if (parts.length === 2) {
      const [gameid, hash] = parts;
      // console.log("User ID:", userId);
      // console.log("Auth Token:", authToken);
      return {
        "gameid": gameid,
        "hash": hash
      }


    }
    else {
      return false
    }
  }
  else {
    return false
  }

}



function validate(...args) {
  for (const arg of args) {
    if (arg === null || arg === undefined || arg === "") {
      return false;
    }
  }
  return true;
}


function validateAmount(amount, minamount) {
  if (!Number.isInteger(amount)) {
    return false;
  }

  if (amount < minamount) {
    return false;

  }
  else {
    return true;
  }

}

async function verifyIdToken(token) {
  // console.log(token)

  if (validate(token)) {


    const parts = token.split("###");

    if (parts.length === 2) {
      const [userId, authToken] = parts;
      // console.log("User ID:", userId);
      // console.log("Auth Token:", authToken);

      var userdata = await db.collection("users").findOne({
        "uuid": userId,
        "token": authToken
      }, {
        projection: projection_default
      })

      if (userdata == null) {
        return false;
      }
      else {
        console.log(userdata);
        return userdata;
      }
    }

    else {
      return false;
    }






  }
  else {
    return false;
  }

}


async function updateBalance(userid, amount) {




  if (amount > 0) {
    var status = await db.collection("users").updateOne({
      "uuid": userid,


    },
      { $inc: { "coins": amount } });

    if (status["modifiedCount"] > 0) {
      return true;

    }
    else {
      return false;
    }


  }
  else {
    var status = await db.collection("users").updateOne({
      "uuid": userid,

      "coins": { $gte: Math.abs(amount) }
    },
      { $inc: { "coins": amount } });

    if (status["modifiedCount"] > 0) {
      return true;

    }
    else {
      return false;
    }

  }





}


app.post("/checklogin", async (req, res) => {


  if (await verifyIdToken(req.body["token"])) {
    res.send("data");
  }
  else {
    res.send("no data");
  }


});







app.post('/updatebalance', async (req, res) => {

  return await updateBalance(req.body["uuid"], req.body["amount"])


});





app.post('/creategame', async (req, res) => {


  var token = req.body["token"];
  var gameName = req.body["gameName"];

  var amount = req.body["amount"];



  if (validateAmount(amount, 10) && validate(gameName)) {


    var userdetails = await verifyIdToken(token);


    if (userdetails) {




      if (userdetails["coins"] >= amount) {





        var update_status = await updateBalance(userdetails["uuid"], (0 - amount));

        var gameidgen = generateRandomString(8);
        var hash = generateRandomString(13);
        var channel = generateRandomString(13);
        if (update_status) {

          var insert_status = await db.collection("games").insertOne({
            "id": gameidgen,
            "game": "Ludo",
            "gamechannel": channel,
            "created_at": new Date(),
            "status": 0,
            "stake": amount,
            "player1_hash": hash,

            "player1": userdetails["uuid"],

          });

          if (insert_status["acknowledged"]) {

            res.send({
              "error": false,
              "gameid": gameidgen,
              "hash": hash,
              "channel":channel,
            })
          }

          /// balance cut done

          // res.send({
          //   "error":"true",
          //   "message":"Unknown Error"
          // })
        }
        else {

          /// balance cut fail

          res.send({
            "error": "true",
            "message": "Unknown Error"
          })

        }








      }
      else {
        res.send({
          "error": true,
          "message": "Insufficient Funds",
          "route": "/"

        })
      }












    }
    else {
      res.send({
        "error": true,
        "message": "Please Relogin",
        "route": "/login"
      })



    }






  }
  else {
    res.send({
      "error": true,
      "message": "Try again later",
      "route": "/"
    })

  }

  // if(validate(gameName,token)){











  // }
  // else{
  //   res.send({
  //     "error":true,
  //     "message":"Try again later"
  //   })
  // }



});








app.post("/joingame", async function (req, res) {

  var token = req.body["token"];

  var gameid = req.body["gameid"];

  if (validate(gameid)) {


    var userdetails = await verifyIdToken(token);

    // if(userdetails["coins"])

    if (userdetails) {


      var gamedetails = await db.collection("games").findOne({
        "id": gameid,
        "status": 0
      });



      if (gamedetails != null) {


        console.log(userdetails["coins"]);
        if (userdetails["coins"] >= gamedetails["stake"]) {

          var updatestatus = await updateBalance(userdetails["uuid"], (0 - gamedetails["stake"]));


          if (updatestatus) {
            var hash = generateRandomString(13);

            var updatestatus = await db.collection("games").updateOne({
              "id": gameid,
              "status": 0
            }, {
              $set: {
                "player2": userdetails["uuid"],
                "join_at": new Date(),
                "status": 1,
                "player2_hash": hash
              }

              // ObjectId("655dcc711b05cf241ddfeab4")
            });

            if (updatestatus["modifiedCount"] == 1) {
              res.send({
                "error": false,
                "hash": hash,
                "channel":gamedetails["gamechannel"]
              })
            }


          }
          else {
            res.send({
              "error": true,
              "message": "Unknown Error"
            });
          }



        }
        else {
          res.send({
            "error": true,
            "message": "Insufficient Funds"
          });
        }

      }


      else {
        res.send({
          "error": true,
          "message": "Game Already Started"
        });
      }







    }
    else {
      res.send({
        "error": true,
        "message": "Please Relogin",
        "route": "/login"
      })
    }



  }
  else {


    res.send({
      "error": true,
      "message": "Try again later",
      "route": "/"
    })

  }


});


async function createping(gameid, hash,res) {



  var gamedetails = await db.collection("games").findOne({
    "id": gameid,
    $or: [
      { "player1_hash": hash },
      { "player2_hash": hash }
    ]

  });



  if (gamedetails != null) {

    var hashfrom = (hash == gamedetails["player1_hash"]) ? "player1" : "player2";

    if (gamedetails["status"] == 0) {

      return;



    }
    else if (gamedetails["status"] == 1) {


      if (hashfrom == "player2") {



        const joinTime = new Date(gamedetails["join_at"]);


        const currentTime = new Date();


        const timeDifferenceMs = currentTime - joinTime;


        const timeDifferenceMinutes = Math.floor(timeDifferenceMs / (1000 * 60));

        if (timeDifferenceMinutes > 3) {




          return cancelgame(gamedetails);

        }




      }
      else if (hashfrom == "player1"){


        var time = new Date();

        db.collection("games").updateOne({
          "id":gamedetails["id"]
        },{
          $set:{
            "status":2,
            "dice": "p1",
      "move": "-",
      "p1_p1_l": 0,
      "p1_p2_l": 0,
      "p1_p3_l": 0,
      "p2_p1_l":0,
      "p2_p2_l":0,
      "p2_p3_l":0,
      "p2_p4_l":0,
      "p1_p4_l":0,
            "lastaction":time,

          }
        }).then(function(resp1){
          if(resp1.modifiedCount==1){


            client.publish("games/" + gamedetails["gamechannel"], JSON.stringify({

             
              // isrolling?Image.asset("assets/dice${spin}.png"):
                 
     
                  "created_at": gamedetails["created_at"],
                  "status": gamedetails["status"],
                  "stake":gamedetails["stake"],
        
            
                  "dice": "p1",
                  "lastaction":time,
                  "move": "-",
                  "p1_p1_l": 0,
                  "p1_p2_l": 0,
                  "p1_p3_l": 0,
                  "p1_p4_l": 0,
                  "p2_p1_l": 0,
                  "p2_p2_l": 0,
                  "p2_p3_l": 0,
                  "p2_p4_l": 0
              
          
            }));

            res.send({
              "error":false,

            })
          }


        })

        




      }
      else {

        return false;


      }

    }





  }
  else {
    res.send({
      "error": true
    });
  }



}




async function startgame(gameid) {
  var la = new Date();
  var updres = await db.collection("games").updateOne({
    "id": gameid,

  }, {
    "$set": {
      "dice": "p1",
      "move": "-",
      "p1_p1_l": 0,
      "p1_p2_l": 0,
      "p1_p3_l": 0,
      "p2_p1_l":0,
      "p2_p2_l":0,
      "p2_p3_l":0,
      "p2_p4_l":0,
      "p1_p4_l":0,
      "lastaction": la,


    }
  });

  if (updres.modifiedCount > 0) {
    return {
      "la": la
    }
  }
  else {
    return false
  }


}







app.post('/createdeposit', (req, res) => {
  var uuid=req.body["uuid"];
    var token=req.body["token"];

var amount=req.body["amount"];
if(validate([uuid,token])&&Number.isInteger(amount)){


  if(amount>=Minimum_Deposit){

    function generateRandomInt() {
      const min = 10000000; // Minimum value (inclusive)
      const max = 99999999; // Maximum value (inclusive)
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    var randomInt = generateRandomInt();

    db.collection("users").findOne({
      "uuid":uuid,
      "token":token
    }).then(function(userdetails){


      if(userdetails!=null){

    
        db.collection("orders").insertOne({
          "uuid":uuid,
          "status":0,
          "amount":amount,
          "name":userdetails["name"],
          "id":randomInt

        }).then(function(insertid){

          if(insertid.insertedId!=undefined){

            res.send({
              "error":false,
              "token":randomInt,
              "amount":amount,
              "upi":upiid,
            });
          }
          else{
            res.send({
              "error":true,
             "message": "unknown error"
            });
          }
        })

      }
      else{
        res.send({
          "error":true,
          "message":"Please Relogin",
          "route":"/login"
        })
      }


    })
    


  }
  else{ res.send({
    "error":true,
    "message":"Invalid Request"
  })

  }



}
else{
  res.send({
    "error":true,
    "message":"Please Fill All Fields"
  })
}

  
});


app.post('/validatedeposit',(req,res)=>{

  var uuid=req.body["uuid"];

  var token=req.body["token"];
  var deposit_token=req.body["deposittoken"];

if(validate([uuid,token,deposit_token])){


  db.collection("orders").updateOne({
    "id":deposit_token,
    "uuid":uuid,
    "status":0
  },{
$set:{
  "status":1
}

  }).then(function(updateset){
    if(updateset.modifiedCount>0){

      res.send({
        "error":false,
      });


    }
    else{
     res.send({
      "error":true,
      "message":"Invalid request"
     })
    }
  })



}
else{
  res.send({
    "error":true,
    "message":"Unknown Error Please Contact Helpline if you money debited from your bank account."
  })
}
});




app.post('/withdrawl', (req, res) => {
  var uuid=req.body["uuid"];
  var token=req.body["token"];
  var amount=req.body["amount"];
  var upiid=req.body["upiid"];

try{

if(amount>=Minimum_Withdrawl&&validate([uuid,token,upiid])){

  db.collection("users").findOne({
    "uuid":uuid,
    "token":token
  }).then(async function(userdata){

    if(userdata["coins"]!=undefined&&userdata["coins"]>=amount){
      var withdrawlstatus=await updateBalance(uuid,(0-amount));

      if(withdrawlstatus){

db.collection("transactions").insertOne({

  "type":"withdrawl",
  "id":generateRandomString(13),
  "from":upiid,
  "status":0,
  "amount":amount,
  "message":"withdrawal request has been created successfully. The requested funds will be credited to your designated payment method within the next 48 hours.",
  "mobilenum":userdata["mobilenum"],




}).then(function(insertplan){
  if(insertplan.insertedId!=undefined){
    res.send({
      "error":false
    })
  }
  else{
    res.send({
      "error":true,
      "message":"Unknown Error"
    })
  }
})




      
      }
      else{
        res.send({
          "error":true,
          "message":"Insufficient Funds"
        })
      }

    }
    else{
      res.send({
        "error":true,
        "message":"Insufficient Funds"
      })
    }
  })

}

}
catch(ee){
  res.send({
    "error":true,
    "message":"Invalid Request"
  })
}






  
});







app.get('/ping', async (req, res) => {

  var Decoded_hash = validateHash(req.query["hash"]);
  if (Decoded_hash) {
    //  return createping(Decoded_hash["gameid"],Decoded_hash["hash"])



    //////start game
   createping(Decoded_hash.gameid,Decoded_hash.hash,res)






  }
  else {

    res.send({
      "error": true,
      "message": "Invalid Hash"
    })
  }




});

var safebox = [0, 8, 13, 21, 26, 34, 39, 47];
var check = [

  26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,undefined,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24
]


function validatemove(gamedetails, player) {

  var player1pawns = [
    gamedetails["p1_p1_l"],
    gamedetails["p1_p2_l"],
    gamedetails["p1_p3_l"],
    gamedetails["p1_p4_l"],

  ];

  var player2pawns = [
    gamedetails["p2_p1_l"],
    gamedetails["p2_p2_l"],
    gamedetails["p2_p3_l"],
    gamedetails["p2_p4_l"],

  ]
  if (player == "player1") {

    var allhome = player1pawns.every(function (element) {
      return element === -1;
    });



    if (allhome) {



      // db.collection("games").updateOne({
      //   "id":gamedetails["id"],
      //   "dice":
      // })

      // client.publish(`games/${gamedetails["gamechannel"]}`, JSON.stringify({

      //   "dice": "p1",
      //   "move": "-",
      //   "p1"

      // }));


    }



  }

  else if (player == "player1") {


  }
  else {

    return false;
  }


}



app.get('/test', (req, res) => {

  client.publish('games/123456', JSON.stringify({

    "dice": "12",
    "from": "server"

  }));

});





app.get('/allgames', async (req, res) => {


var gamename=req.query["game"];

 if(validate([gamename])){
  var allgames=await db.collection("games").find({
    "status":0,
    "game":gamename,



  },{
    "projection":{
      "_id":0,
      "gamechannel":0,
      "player1_hash":0,
      "player2_hash":0,

    }
  }).toArray();


  res.send(allgames)
 }
 else{
  res.send({
    "error":true,
    "message":"Unknown Error"
  })
 }


  
});














function findpossiblemove(a, b, c, d, dice) {
  console.log("posiblelist :  --------- A -"+a);
  console.log("posiblelist :  --------- D -"+d );
  var posiblelist = [];
  ///////// posible path for a 
  if (((a + dice) <= 56)) {
    posiblelist.push(true)
  }
  else {
    posiblelist.push(false);
  }

  //////////   posible path for b 

  if (((b + dice) <= 56)) {
    posiblelist.push(true)
  }
  else {
    posiblelist.push(false);
  }

  /////// posible apath for c
  if (((c + dice) <= 56)) {
    posiblelist.push(true)
  }
  else {
    posiblelist.push(false);
  }


  ///////// posible path for d
  if (((d + dice) <= 56)) {
    posiblelist.push(true)
  }
  else {
    posiblelist.push(false);
  }

  return posiblelist;

}

async function movepawn(gamedetails, coin, dice, res) {
  console.log(coin);

  if(gamedetails["move"]=="p1"){

    var newposition = gamedetails[coin] + dice;


    if (safebox.includes(newposition)) {
      var time=new Date();
  
     var updatestats = await db.collection("games").updateOne({
        "id": gamedetails["id"],
  
      }, {
        $set: {
          [coin]: newposition,
          "dice": "p2",
          "move": "-",
          "lastaction":time
  
        }
      });
  
      
      if(updatestats.modifiedCount>0){
        gamedetails[coin]= newposition,
        gamedetails["dice"]="p2";
        gamedetails["move"]="-";
        gamedetails["lastaction"]=time;
        
        
        client.publish("games/" + gamedetails["gamechannel"], JSON.stringify(gamedetails));
        
  
  
  
  
  
        res.send({
          "error":false,
        })
      }
      else{
        res.send({
          "error":true,
        })
  
      }
  
    
  
    }
    else {
  
      // 11111---------------------111---------------111-----------------1111---------------11111-------------1111-
  console.log("new position : "+newposition);

      var oppinverse = check[newposition];
   console.log("opposite position : "+oppinverse);
      var killed = false;
      var updatedpawn = {
        "p2_p1_l": gamedetails["p2_p1_l"],
        "p2_p2_l": gamedetails["p2_p2_l"],
        "p2_p3_l": gamedetails["p2_p3_l"],
        "p2_p4_l": gamedetails["p2_p4_l"],
  
      }
  
      if (oppinverse == gamedetails["p2_p1_l"]) {
        // p1 died
  
        updatedpawn["p2_p1_l"] = 0;
        killed = true;
  
      }
      if (oppinverse == gamedetails["p2_p2_l"]) {
        updatedpawn["p2_p2_l"] = 0;
        killed = true;
      }
      if (oppinverse == gamedetails["p2_p3_l"]) {
        updatedpawn["p2_p3_l"] = 0;
        killed = true;
      }
  
  
      if (oppinverse == gamedetails["p2_p4_l"]) {
        updatedpawn["p2_p4_l"] = 0;
        killed = true;
      }
  
  
  
      if (killed) {
  
        var time = new Date();
        var updatestate = await db.collection("games").updateOne({
          "id": gamedetails["id"]
        }, {
          $set: {
            [coin]: newposition,
            "dice": "p1",
            "move": "-",
            "lastaction": time,
            "p2_p1_l": updatedpawn["p2_p1_l"],
            "p2_p2_l": updatedpawn["p2_p2_l"],
            "p2_p3_l": updatedpawn["p2_p3_l"],
            "p2_p4_l": updatedpawn["p2_p4_l"],
          }
        });
  
  
        if (updatestate.modifiedCount > 0) {
          /////// send to mqtt
  
  gamedetails[coin]=newposition;
  gamedetails["dice"]="p1";
  gamedetails["move"]="-";
  gamedetails["lastaction"]=time;
  gamedetails["p2_p1_l"]=updatedpawn["p2_p1_l"];
  gamedetails["p2_p2_l"]=updatedpawn["p2_p2_l"];
  gamedetails["p2_p3_l"]= updatedpawn["p2_p3_l"];
  gamedetails["p2_p4_l"]= updatedpawn["p2_p4_l"];
  
  
  
          client.publish("games/" + gamedetails["gamechannel"], JSON.stringify(gamedetails));
  
          res.send({
            "error": false,
          });
  
        }
        else{
          res.send({
            "error": true,
          });
        }
  
  
  
      }
  
  
      else {
  
  
        var time = new Date()
  /////////////        if dice 6
        if(gamedetails["dicenum"]==6){
  
          var updatestate = await db.collection("games").updateOne({
            "id": gamedetails["id"]
          }, {
            $set: {
              [coin]:newposition,
              "dice": "p1",
              "lastaction": time,
              "move": "-",
  
            }
          });
  
  
          if (updatestate.modifiedCount > 0) {
  
            /////// send to mqtt
  
            gamedetails[coin]=newposition;
            gamedetails["dice"]="p1";
            gamedetails["lastaction"]=time;
            gamedetails["move"]="-";
  
            client.publish("games/" + gamedetails["gamechannel"], JSON.stringify(gamedetails));
  
  
  
            res.send({
              "error": false,
            });
  
          }
          else{
  
            res.send({
              "error": true,
            });
  
          }
  
  
        }
        //////// dice is not 6
        else{
          var updatesxx={ coin:newposition};
          var updatestate = await db.collection("games").updateOne({
            "id": gamedetails["id"]
          }, {
            $set: {
              [coin]:newposition,
              "dice": "p2",
              "lastaction": time,
              "move": "-",
  
            }
          });
  
  
          if (updatestate.modifiedCount > 0) {
  
            /////// send to mqtt
  
            gamedetails[coin]=newposition;
            gamedetails["dice"]="p2";
            gamedetails["lastaction"]=time;
            gamedetails["move"]="-";
  
            client.publish("games/" + gamedetails["gamechannel"], JSON.stringify(gamedetails));
  
  
  
            res.send({
              "error": false,
            });
  
          }
          else{
  
            res.send({
              "error": true,
            });
  
          }
        }
  
      
  
  
      }
  
  
  
  
    }


  }
  else if(gamedetails["move"]=="p2"){
    /////////////////////////////////////////////////   p2
    var newposition = gamedetails[coin] + dice;


    if (safebox.includes(newposition)) {
      var time=new Date();
  
     var updatestats = await db.collection("games").updateOne({
        "id": gamedetails["id"],
  
      }, {
        $set: {
          [coin]: newposition,
          "dice": "p1",
          "move": "-",
          "lastaction":time
  
        }
      });
  
      
      if(updatestats.modifiedCount>0){
        gamedetails[coin]= newposition,
        gamedetails["dice"]="p1";
        gamedetails["move"]="-";
        gamedetails["lastaction"]=time;
        
        
        client.publish("games/" + gamedetails["gamechannel"], JSON.stringify(gamedetails));
        
  
  
  
  
  
        res.send({
          "error":false,
        })
      }
      else{
        res.send({
          "error":true,
        })
  
      }
  
    
  
    }
    else {
  
      // 11111---------------------111---------------111-----------------1111---------------11111-------------1111-
  
      var oppinverse = check[newposition];

      console.log(oppinverse);
  
      var killed = false;
      var updatedpawn = {
        "p1_p1_l": gamedetails["p1_p1_l"],
        "p1_p2_l": gamedetails["p1_p2_l"],
        "p1_p3_l": gamedetails["p1_p3_l"],
        "p1_p4_l": gamedetails["p1_p4_l"],
  
      }
  
      if (oppinverse == gamedetails["p1_p1_l"]) {
        // p1 died
  
        updatedpawn["p1_p1_l"] = 0;
        killed = true;
  
      }
      if (oppinverse == gamedetails["p1_p2_l"]) {
        updatedpawn["p1_p2_l"] = 0;
        killed = true;
      }
      if (oppinverse == gamedetails["p1_p3_l"]) {
        updatedpawn["p1_p3_l"] = 0;
        killed = true;
      }
  
  
      if (oppinverse == gamedetails["p1_p4_l"]) {
        updatedpawn["p1_p4_l"] = 0;
        killed = true;
      }
  
  
  
      if (killed) {
  
        var time = new Date();
        var updatestate = await db.collection("games").updateOne({
          "id": gamedetails["id"]
        }, {
          $set: {
            coin: newposition,
            "dice": "p2",
            "move": "-",
            "lastaction": time,
            "p1_p1_l": updatedpawn["p1_p1_l"],
            "p1_p2_l": updatedpawn["p1_p2_l"],
            "p1_p3_l": updatedpawn["p1_p3_l"],
            "p1_p4_l": updatedpawn["p1_p4_l"],
          }
        });
  
  
        if (updatestate.modifiedCount > 0) {
          /////// send to mqtt
  
  gamedetails[coin]=newposition;
  gamedetails["dice"]="p2";
  gamedetails["move"]="-";
  gamedetails["lastaction"]=time;
  gamedetails["p1_p1_l"]=updatedpawn["p1_p1_l"];
  gamedetails["p1_p2_l"]=updatedpawn["p1_p2_l"];
  gamedetails["p1_p3_l"]= updatedpawn["p1_p3_l"];
  gamedetails["p1_p4_l"]= updatedpawn["p1_p4_l"];
  
  
  
          client.publish("games/" + gamedetails["gamechannel"], JSON.stringify(gamedetails));
  
          res.send({
            "error": false,
          });
  
        }
        else{
          res.send({
            "error": true,
          });
        }
  
  
  
      }
  
  
      else {
  
  
        var time = new Date()
  /////////////        if dice 6
        if(gamedetails["dicenum"]==6){
  
          var updatestate = await db.collection("games").updateOne({
            "id": gamedetails["id"]
          }, {
            $set: {
              [coin]:newposition,
              "dice": "p2",
              "lastaction": time,
              "move": "-",
  
            }
          });
  
  
          if (updatestate.modifiedCount > 0) {
  
            /////// send to mqtt
  
            gamedetails[coin]=newposition;
            gamedetails["dice"]="p2";
            gamedetails["lastaction"]=time;
            gamedetails["move"]="-";
  
            client.publish("games/" + gamedetails["gamechannel"], JSON.stringify(gamedetails));
  
  
  
            res.send({
              "error": false,
            });
  
          }
          else{
  
            res.send({
              "error": true,
            });
  
          }
  
  
        }
        //////// dice is not 6
        else{
          var updatestate = await db.collection("games").updateOne({
            "id": gamedetails["id"]
          }, {
            $set: {
              [coin]:newposition,
              "dice": "p1",
              "lastaction": time,
              "move": "-",
  
            }
          });
  
  
          if (updatestate.modifiedCount > 0) {
  
            /////// send to mqtt
  
            gamedetails[coin]=newposition;
            gamedetails["dice"]="p1";
            gamedetails["lastaction"]=time;
            gamedetails["move"]="-";
  
            client.publish("games/" + gamedetails["gamechannel"], JSON.stringify(gamedetails));
  
  
  
            res.send({
              "error": false,
            });
  
          }
          else{
  
            res.send({
              "error": true,
            });
  
          }
        }
  
      
  
  
      }
  
  
  
  
    }

  }
  else{
    res.send({
      "error":true
    })
  }

}



function checkonlyonemove(posiblemove) {

  if (posiblemove == [true, false, false, false]) {
    return 1;
  }
  else if (posiblemove == [false, true, false, false]) {
    return 2;
  }
  else if (posiblemove == [false, false, true, false]) {
    return 3;

  }
  else if (posiblemove == [false, false, false, true]) {
    return 4;
  }
  else {
    return 0;
  }

}

async function RoolDice(gameid, hash,res) {


  var gamedetails = await db.collection("games").findOne({
    "id": gameid,
    $or: [
      { "player1_hash": hash },
      { "player2_hash": hash }
    ]

  });

  if (gamedetails != null) {



    if (gamedetails["player1_hash"] == hash) {


      /////// player 1 hash valid
      console.log("gamedetails verified");
      console.log(gamedetails);
    
      if (gamedetails["dice"] == 'p1') {
        /// valid dice 
        console.log("from player1 validated1");
    
        const randomNumber = getRandomInt(1, 7);
    
        var posiblemove = findpossiblemove(gamedetails["p1_p1_l"], gamedetails["p1_p2_l"], gamedetails["p1_p3_l"], gamedetails["p1_p4_l"], randomNumber);
    
    
        if (posiblemove[0] == false && posiblemove[1] == false && posiblemove[2] == false && posiblemove[3] == false) {
          var time = new Date();
          /// no posible move
    
         var dbr= await db.collection("games").updateOne({
            "id": gamedetails["id"]
          }, {
            $set: {
              "dicenum": randomNumber,
    
              "lastaction": time,
    
              "dice": "p2",
              "move": "-",
    
    
            }
          });


          if(dbr.modifiedCount>0){


gamedetails["dicenum"]=randomNumber;
gamedetails["dice"]="p2";
gamedetails["move"]="-";
gamedetails["lastaction"]=time;


client.publish("games/" + gamedetails["gamechannel"], JSON.stringify(gamedetails));


res.send({
  "error": false
})

          }
          else{


res.send({
  "error": true
})
          }
 







        
    
        }
    
        else {
          var staus1 = await db.collection("games").updateOne({
            "id": gamedetails["id"]
          }, {
            $set: {
    
              "dicenum": randomNumber,
              "p1_p": posiblemove[0],
              "p2_p": posiblemove[1],
              "p3_p": posiblemove[2],
              "p4_p": posiblemove[3],
    
              "dice": "-",
              "move": "p1",
    
    
            }
          });

    
    
          if (staus1.modifiedCount > 0) {
    
    
           
            gamedetails["dicenum"]=randomNumber;
            gamedetails[ "p1_p"]=posiblemove[0],
            gamedetails["p2_p"]= posiblemove[1],
            gamedetails ["p3_p"]= posiblemove[2],
            gamedetails ["p4_p"]= posiblemove[3],
            gamedetails["dice"]="-";
            gamedetails["move"]="p1";
          
            
            
            client.publish("games/" + gamedetails["gamechannel"], JSON.stringify(gamedetails));
    
    
      
    
    
            res.send({
              "error": false
            })
          }
          else{
            res.send({
              "error": true
            })
          }
    
    
        }
    
      }
    
    }

    else if (gamedetails["player2_hash"] == hash) {


      /////// player 1 hash valid
      console.log("gamedetails p2 verified");
    
      if (gamedetails["dice"] == 'p2') {
        /// valid dice 
        console.log("from player2 validated2");
    
        const randomNumber = getRandomInt(1, 7);
    
        var posiblemove = findpossiblemove(gamedetails["p2_p1_l"], gamedetails["p2_p2_l"], gamedetails["p2_p3_l"], gamedetails["p2_p4_l"], randomNumber);
    
    
        if (posiblemove[0] == false && posiblemove[1] == false && posiblemove[2] == false && posiblemove[3] == false) {
          var time = new Date();
          /// no posible move
    
          var dbr= await  db.collection("games").updateOne({
            "id": gamedetails["id"]
          }, {
            $set: {
              "dicenum": randomNumber,
    
              "lastaction": time,
    
              "dice": "p1",
              "move": "-",
    
    
            }
          });



          if(dbr.modifiedCount>0){


            gamedetails["dicenum"]=randomNumber;
            gamedetails["dice"]="p1";
            gamedetails["move"]="-";
            gamedetails["lastaction"]=time;
            
            
            client.publish("games/" + gamedetails["gamechannel"], JSON.stringify(gamedetails));
            
            
            res.send({
              "error": false
            })
            
                      }





          
    
        }
    
        else {
          var staus1 = await db.collection("games").updateOne({
            "id": gamedetails["id"]
          }, {
            $set: {
    
              "dicenum": randomNumber,
              "p1_p": posiblemove[0],
              "p2_p": posiblemove[1],
              "p3_p": posiblemove[2],
              "p4_p": posiblemove[3],
    
              "dice": "-",
              "move": "p2",
    
    
            }
          });
    
         
    
    
    
    
          if (staus1.modifiedCount > 0) {
    
    
 
            gamedetails["dicenum"]=randomNumber;
            gamedetails[ "p1_p"]=posiblemove[0],
            gamedetails["p2_p"]= posiblemove[1],
            gamedetails ["p3_p"]= posiblemove[2],
            gamedetails ["p4_p"]= posiblemove[3],
            gamedetails["dice"]="-";
            gamedetails["move"]="p2";
          
            
            client.publish("games/" + gamedetails["gamechannel"], JSON.stringify(gamedetails));
    
    
            res.send({
              "error": false
            })
          }
    
    
        }
    
      }
    
    }


  }
  else {
    return {
      "error":true
    };
  }


}




app.get('/roll', (req, res) => {
  console.log(req.query);

  var Decoded_hash = validateHash(req.query["hash"]);
  if (Decoded_hash) {


    RoolDice(Decoded_hash["gameid"], Decoded_hash["hash"],res)



  }
  else {

    res.send({
      "error": true,
      "message": "Unknown Error"
    })
  }




});


app.get('/move', async (req, res) => {

  var hash=req.query["hash"];
  var coin =req.query["coin"];


if(validate(hash)&&validate(coin)){



  var Decoded_hash=validateHash(hash);

if(Decoded_hash){



 var gamedetails=await db.collection("games").findOne({

    "id":Decoded_hash.gameid,

    $or: [
      { "player1_hash": Decoded_hash.hash },
      { "player2_hash": Decoded_hash.hash  }
    ]

  });


  if(gamedetails!=null){


if(gamedetails["player1_hash"]==Decoded_hash.hash){
  ///////////// hash is from use r 1
  /// user is player 1

  if(gamedetails["move"]=="p1"){
/// authorized movr

if(coin=="p1"){

  if(gamedetails["p1_p"]==true){

    movepawn(gamedetails,"p1_p1_l",gamedetails["dicenum"],res);

  }


}
else if(coin=="p2"){
  if(gamedetails["p2_p"]==true){

    movepawn(gamedetails,"p1_p2_l",gamedetails["dicenum"],res);


  }
}
else if(coin=="p3"){
  if(gamedetails["p3_p"]==true){

    movepawn(gamedetails,"p1_p3_l",gamedetails["dicenum"],res);
    
  }
  
}

else if(coin=="p4"){
  if(gamedetails["p4_p"]==true){
    
    movepawn(gamedetails,"p1_p4_l",gamedetails["dicenum"],res);

  }
  
}


  }
  else{
    res.send({
      "error":true
    })

    //// un authorized

  }


}
else if(gamedetails["player2_hash"]==Decoded_hash.hash){
  /// user is player 2 

  if(gamedetails["move"]=="p2"){
    /// authorized 
    
if(coin=="p1"){

  if(gamedetails["p1_p"]==true){

    movepawn(gamedetails,"p2_p1_l",gamedetails["dicenum"],res);

  }


}
else if(coin=="p2"){
  if(gamedetails["p2_p"]==true){

    movepawn(gamedetails,"p2_p2_l",gamedetails["dicenum"],res);


  }
}
else if(coin=="p3"){
  if(gamedetails["p3_p"]==true){

    movepawn(gamedetails,"p2_p3_l",gamedetails["dicenum"],res);
    
  }
  
}

else if(coin=="p4"){
  if(gamedetails["p4_p"]==true){
    
    movepawn(gamedetails,"p2_p4_l",gamedetails["dicenum"],res);

  }
  
}

      }
      else{
    
        //// un authorized
    
      }
    
}
else{

}







  }
  else{
    res.send({
      "error":true
    })
  }





}
else{

  res.send({
    "error":true
  })
}



}
else{



  res.send({
    "error":true
  })
}

  
});
function generateRandom4DigitNumber() {
  return Math.floor(1000 + Math.random() * 9000);
}



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
          
          db.collection("otps").insertOne({ "otpvalue": generated_otp, "otp_token": data_json["request_id"], "mobile_num":mobilenum,
      
       
        }).then(function(result){
  
              if(result.insertedId!=undefined){
                  res.send({
                      "error":false,
                      "token":data_json["request_id"]
                  })
              }
              else{
                  res.send({
                      "error":true,
                      "message":"Invalid Mobile Number"
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


  if(validate[otp,mobilenum,token]){

    console.log(" step 1 pass");

  try{
    db.collection("otps").find({
      "otp_token":token,
      "mobile_num":mobilenum
    }).toArray().then(function(data){
        console.log(" step 2 pass");
        if(data.data.length>0){
            console.log(" step 3 pass");


            if(data.data[0]["validity"]<4){
                console.log(" step 4 pass");
            if(data.data[0]["mobile_num"]==mobilenum&&otp==data.data[0]["otpvalue"]&&data.data[0]["otpvalue"]){
                console.log(" step 5 pass");
                db.collection("otps").deleteOne({
                  "otp_token":token
                }).then(function(reoo__){







                  db.collection("users").findOne({
                    "mobilenum":mobilenum,
                    
                  }).then(function(userdata){


                    if(userdata!=null){

                      var uuid=generateRandomString(11);
                      var token=generateRandomString(13);
                      db.collection("users").insertOne({
                        "mobilenum":mobilenum,
                        "uuid":uuid,
                        "token":token
                      }).then(function(userinsert){
                        if(userinsert.insertedId!=undefined){
                          res.send({
                            "error":false,
                            "route":'/register',
                            "uuid":uuid,
                            'token':token
                          })
                        }
                      })


                      
                    }
                  else{

                    var token=generateRandomString(13);
if(userdata["name"]!=undefined){

  db.collection("users").updateOne({
    "mobilenum":mobilenum
  },{
    $set:{
      "token":token

    }
  }).then(function(updatestatus){
  if(updatestatus.modifiedCount==1){
    res.send({
      "error":false,
      "uuid":userdata["uuid"],
      "token":token,
      "route":"/home"
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
  db.collection("users").updateOne({
    "mobilenum":mobilenum
  },{
    $set:{
      "token":token

    }
  }).then(function(updatestatus){
  if(updatestatus.modifiedCount==1){
    res.send({
      "error":false,
      "uuid":userdata["uuid"],
      "token":token,
      "route":"/register"
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



                  }

                  })



                   
             



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


app.post('/registeruser', (req, res) => {
  var uuid=req.body["uuid"];
  var token=req.body["token"];
var name=req.body["name"];
var reffercode=req.body["reffer_code"];

if(validate([uuid,token,name,reffercode])){


  
db.collection("users").updateOne({
  "token":token,
  "uuid":uuid
},{
  $set:{
    "name":name,
    "refferby":reffercode,
    "refferalcode":generatereferal(4),
  }
}).then(function(updatestat){
  if(updatestat.modifiedCount>0){
    res.send({
      "error":false,
      "route":"/home"
    })
  }
  else{
    res.send({
      "error":true,
      "route":"/login",
      "message":"Re Login"
    })
  }
})



}
else{


res.send({
  "error":true,
  "message":"Please Fill Required Fileds"
})
}


});








app.get('/profile', (req, res) => {


var hash=req.body["hash"];

if(validate([hash])){
var hashprams=validateHash(hash);

if(hashprams){

 var uuid= hashprams.gameid;
 var token= hashprams.hash;


 db.collection("users").findOne({
  "uuid":uuid,
  "token":token
 },{
  "projection":{
    "_id":0,
    "token":0,


  }
 }).then(function(userdata){

  if(userdata!=null){
    res.send(userdata);
  }
  else{
    res.send({
      "error":true,
      "message":"Please Relogin",
      "route":"/login"
    })
  }
 })

}
else
{

  res.send({
    "error":true,
    "message":"Unknown Error",
    "route":"/"
  })
}
  



}
else{
  res.send({
    "error":true,
    "message":"Unknown Error",
    "route":"/"
  })
  
}



  
});
















  


app.get('/', function (req, res) {
  mongo.db("sixgames").collection("users").find().toArray()
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.error(err);
    });

  // mongo.db("sixgames").collection("users").find({}).toArray(function(err, result) {
  //   if (err) throw err;
  //   console.log(result);

  // });



});





// Handle message events
// client.on('message', (topic, message) => {

//   var mew = message.toString();
//   console.log(typeof message.toString());
//   var message_body = JSON.parse(JSON.parse(JSON.stringify(mew)));
//   console.log("//////////////////////////////");
//   function getRandomInt(min, max) {
//     const range = max - min;
//     const randomBytes = crypto.randomBytes(4); // Using 4 bytes for a 32-bit integer

//     // Convert the random bytes to a number and scale to the desired range
//     const randomNumber = Math.floor(
//       (randomBytes.readUInt32LE(0) / 0xffffffff) * range
//     ) + min;

//     return randomNumber;
//   }

//   if (message_body["action"] == "spin") {

//     supabase.from('ludogame').select("*").eq("id",).eq("player1", "player1").then(function (gamedata) {


//       if (gamedata.data.length > 0) {
//         //// valid game 
//         var gamescene = gamedata.data[0];

//         if (gamescene["up_action"] == "p1_dice") {

//           client.publish('game', JSON.stringify({

//             "dice": randomNumber,
//             "from": "server"

//           }));


//         }




//       }
//       else {
//         /// invalid game
//       }


//     })




//     // const randomNumber = getRandomInt(1, 7);

//     //  console.log(randomNumber);
//     //       client.publish('ludo', JSON.stringify({

//     //           "dice":randomNumber,
//     //           "from":"server"

//     //       }));

//   }

// });















// Subscribe to a topic (optional)
// client.subscribe('ludo');

// Publish a message (optional)
//   client.publish('ludo', 'Hello, MQTT!');

// Handle disconnection events
client.on('close', () => {
  console.log('Disconnected from MQTT broker');
});

// Handle termination signals (Ctrl+C, etc.)

// //////////////////////////////////////////////// emqx //////////////////////////////////////////









// https://lk.gggred.com/?rmc=05421526&gt=0
// https://lk.gggred.com/?rmc=04286966&gt=0



// https://youtu.be/4QOIsL5ZEd0



exports.app = functions.https.onRequest(app);

// app.listen(3000).then(() => {
//   console.log('Server running at http://localhost:3000/');
// });

// https://dribbble.com/shots/20546845-Logo-Design
// https://dribbble.com/shots/18259017-HARTWELL-MOTOR-CO-BRAND-KIT
// https://dribbble.com/shots/6141892-zzap
// https://dribbble.com/shots/18242740-Dose
// https://www.behance.net/gallery/183494489/Barangay-and-SK-Elections?tracking_source=search_projects|election&l=62
// https://www.behance.net/gallery/149836471/Election-Campaign?tracking_source=search_projects|election&l=228