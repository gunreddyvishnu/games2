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
} = require("./modules/auth");

const { generateRandomString, validate } = require("./modules/services");

const { connectmqtt } = require("./modules/mqttconnection");

const { updateBalanceNotifier } = require("./modules/notifiers");

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






// hey


const port = process.env.PORT || 3000;

app.listen(port).then(() => {
  connectToMongo();
  connectmqtt();

  updateBalanceNotifier();
});
