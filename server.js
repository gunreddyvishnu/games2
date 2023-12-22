const https = require("https");
const crypto = require("crypto");
var bodyParser = require("body-parser");

const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

const { db, connectToMongo } = require("./modules/mongoConnection");

const fastify = require("fastify");
const app = fastify();
const { error } = require("console");

//////  imports

const {
  login,
  verifylogin,
  validateToken,
  registeruser,
  updateprofile,
} = require("./modules/auth");

const { generateRandomString, validate } = require("./modules/services");

const { connectmqtt } = require("./modules/mqttconnection");

const { updateBalanceNotifier } = require("./modules/notifiers");


const {hostGame}=require('./modules/gamemanager');

/// login
app.post(
  "/login",
  {
    schema: {
      body: {
        type: "object",
        properties: {
          phone: { type: "string", minLength: 10, maxLength: 10 },
        },
        required: ["phone"],
      },
    },
  },
  login
);

/// verify login
app.post(
  "/verifylogin",
  {
    schema: {
      body: {
        type: "object",
        properties: {
          otp_token: { type: "string" },

          otp_value: { type: "string", minLength: 4, maxLength: 4 },
        },
        required: ["otp_token", "otp_value"],
      },
    },
  },
  verifylogin
);

/// get user info
app.get("/user", async function (req, res) {
  const token = req.headers["authorization"];

  var userdata = await validateToken(token);

  if (userdata) {
    res.send(userdata);
  } else {
    res.status(403).send({ status: 403, err: "Invalid token" });
  }

  // console.log(userdata);
});

/// register new user
app.post(
  "/user",
  {
    schema: {
      body: {
        type: "object",
        properties: {
          name: { type: "string" },
          dp: { type: "string" },
        },
        required: ["name", "dp"],
      },
    },
  },
  async function (req, res) {
    const token = req.headers["authorization"];

    var userdata = await validateToken(token);

    if (userdata) {
      if (validate(userdata["name"])) {
        res.status(403).send({ status: 403, err: "user already exists" });
      } else {
        res.send(
          await registeruser({
            uid: userdata["uid"],
            name: req.body["name"],
            dp: req.body["dp"],
          })
        );
      }
    } else {
      res.status(403).send({ status: 403, err: "Invalid token" });
    }

    // console.log(userdata);
  }
);

/// Update User data api

app.post(
  "/updateprofile",
  {
    schema: {
      body: {
        type: "object",
        properties: {
          dp: { type: "string" },
        },
        required: ["dp"],
      },
    },
  },
  async (req, res) => {
    const token = req.headers["authorization"];

    var userdata = await validateToken(token);

    if (userdata) {
      // res.send(userdata);

      res.send(
        await updateprofile({
          uid: userdata["uid"],
          dp: req.body["dp"],
        })
      );
    } else {
      res.status(403).send({ status: 403, err: "Invalid token" });
    }
  }
);

/// Get Game Details Api   { Topic[id] , Thumbnail , Discription }

// app.get('/games',function(re))

app.get("/games/:gameid", (req, res) => {
  var gameid = req.params.gameid;

  if (validate(gameid)) {
    if (gameid == "Ludo") {
      res.send({
        error: false,
        data: {
          thumbnail:
            "https://is4-ssl.mzstatic.com/image/thumb/Purple123/v4/79/a8/5e/79a85eec-a5d7-5624-274e-95d7a358033c/source/512x512bb.jpg",
          name: "Ludo King",
          description: "Play Ludo and Enjoy game",
          id: "ludogame23567",
        },
      });
    } else if (gameid == "TicTacToe") {
      res.send({
        error: false,
        data: {
          thumbnail:
            "https://upload.wikimedia.org/wikipedia/commons/7/7d/Super_tic-tac-toe_rules_example.png",
          name: "Tic Tac Toe",
          description: "Play Tic tac Toe and Enjoy game",
          id: "tictacgame23567",
        },
      });
    } else {
      res.send({
        error: true,
        message: "invalid game",
      });
    }
  } else {
    res.send({
      error: true,
      message: "invalid game",
    });
  }
  // res.send(validate(req.params.gameid));
});



app.post('/hostGame', {
schema: {
 body: {
type: 'object',
properties: {
  'gameid': { type: 'string' },
  'amount': { type: 'integer',minimum: 10, maximum: 2000},
 //  email: { type: 'string', format: 'email' }, 
  //  age: { type: 'integer' }, 
  //  mobile: { type: 'string', minLength: 10 }, 
},
 required: ['gameid','amount'], 
    }, 
  },
   },hostGame); 

// hey

const port = 3000;

app.listen(port,"0.0.0.0").then(() => {
  connectToMongo();
  connectmqtt();
  // end
  // sudo ssh -i /Users/vishnu/Downloads/login\ \(1\).pem  ec2-user@ec2-54-221-140-192.compute-1.amazonaws.com
  // updateBalanceNotifier();
});
