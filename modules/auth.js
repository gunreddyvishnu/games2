const axios = require("axios");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const { print } = require("./logger");
const https = require("https");
const { generateRandomString, validate } = require("./services");

const { db, connectToMongo } = require("./mongoConnection");
const { log } = require("console");

async function login(req, res) {
  res.send(await sendotp(req.body["phone"]));
}

async function verifylogin(req, res) {
  res.send(await validatelogin(req.body));
}

async function validateToken(token) {
  try {
    if (token.length == 256) {
      var userdetails = await db.collection("sessions").findOne({
        token: token,
        valid: true,
      });

      if (validate(userdetails)) {
        var uid = userdetails["uid"];

        if (validate(uid)) {
          var userdetails = db.collection("users").findOne({
            uid: uid,
          },
          
          {
            projection:{
              "_id": 0,
        
          }

          }
          
          );

          if (validate(userdetails)) {
            return userdetails;
          } else {
            return false;
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (ee) {
    return false;
  }
}

function sendotp(mobilenum) {
  return new Promise((resolve, reject) => {
    var generated_otp = generateRandomString(4, true);
    const url = "https://www.fast2sms.com/dev/bulkV2";

    const authorization =
      "vEdOVMqLJn0NHa9XUK8eQibIFsPCkwzcu7pmoxlY145Dy63TZtAdzFTvLDtmNHYuGZC7R9enaOfQVB0q";

    const route = "otp";

    const variables_values = generated_otp;
    const flash = "0";
    const numbers = mobilenum;

    const finalUrl = `${url}?authorization=${authorization}&route=${route}&variables_values=${variables_values}&flash=${flash}&numbers=${numbers}`;

    https.get(finalUrl, (response) => {
      let data = "";

      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", async () => {
        try {
          var data_json = JSON.parse(data);

          var data_json = {
            request_id: generateRandomString(6, false),
          };

          //////// adding otp token into db

          var status = await db.collection("auth").insertOne({
            otp_token: data_json["request_id"],
            otp_value: generated_otp,
            valid: true,
            phone: mobilenum,
            created: Date(),
          });

          if (status.acknowledged) {
            resolve({
              otp_token: data_json["request_id"],
            });
          } else {
            reject(false);
          }
        } catch (ee) {
          print(ee);
          reject(false);
        }
      });
    });
  });
}

async function validatelogin(body) {
  const otp_token = body["otp_token"];
  const otp_value = body["otp_value"];

  try {
    var otpdata = await db.collection("auth").findOne({
      otp_token: otp_token,
      otp_value: otp_value,
      valid: true,
    });

    if (validate(otpdata)) {
      // otpdata
      var update = await db.collection("auth").updateOne(
        {
          otp_token: otp_token,
          otp_value: otp_value,
          valid: true,
        },
        {
          $set: {
            valid: false,
          },
        }
      );

      if (update.modifiedCount > 0) {
        return createauthSession(otpdata["phone"]);
      }
    } else {
      return {
        error: true,
        message: "Code Expired Please Retry",
      };
    }
  } catch (d) {
    console.log(d);
    // print(d)
    return {
      error: true,
    };
  }
}

async function createauthSession(mobilenum) {
  try {
    var userdetails = await db.collection("users").findOne({
      phone: mobilenum,
    });

    if (validate(userdetails)) {
      if (userdetails["block"]) {
        return {
          error: true,
          message: "your account is blocked due to suspicious activity",
        };
      } else {
        const session_token = generateRandomString(256);

        var ssn_status = await db.collection("sessions").insertOne({
          token: session_token,
          valid: true,
          uid: userdetails["uid"],
        });

        if (ssn_status.acknowledged) {
          return {
            error: false,
            token: session_token,
          };
        } else {
          return {
            error: true,
            message: "unknown error",
          };
        }
      }
      // user Exists
    } else {
      const session_token = generateRandomString(256);
      const uid = generateRandomString(16);
      var user_create_st = await db.collection("users").insertOne({
        phone: mobilenum,
        block: false,
        created: Date(),
        uid: uid,
      });

      if (user_create_st.acknowledged) {
        const session_token = generateRandomString(32);

        var ssn_status = await db.collection("sessions").insertOne({
          token: session_token,
          valid: true,
          created: Date(),
          uid: uid,
        });

        if (ssn_status.acknowledged) {
          return {
            error: false,
            token: session_token,
          };
        } else {
          return {
            error: true,
            message: "unknown error",
          };
        }
      } else {
        return {
          error: true,
          message: "unknown error",
        };
      }
    }
  } catch (ee) {
    return {
      error: true,
      message: "Unknown Error",
    };
  }
}

async function registeruser(data) {
  try {
    var status = await db.collection("users").updateOne(
      {
        // find

        uid: data["uid"],
      },
      {
        set: {
          name: data["name"],
          dp: data["dp"],
          //  update values
        },
      },

      { upsert: true }
    );

    if (status.modifiedCount > 0) {
      return {
        error: false,
        message: "User Created",
      };
    } else {
      return {
        error: true,
        message: "Error try Again",
      };
    }
  } catch (ee) {
    print(ee);

    return {
      error: true,
      message: "Error try Again",
    };
  }
}





async function updateprofile(data){


if(validate(data["uid"]&&data["dp"])){


// await db.collection("users").up

try{
  var updatestatus=await db.collection("users").updateOne(
    {
      // find
      
      "uid":data["uid"]
      },
      {
        $set: {
      
          "dp":data["dp"]
        //  update values
        },
      }
  );
    
    
    if(updatestatus.modifiedCount>0){
    return {
      "error":false,
      "message":"Profile data updated"
    }
    
    }
    else{
      return {
        "error":true,
        "message":"Unknown Error"
      }
    }
    
}
catch(ee){

  console.log(ee);


  return {
    "error":true,
    "message":"Unknown Error"
  }
}
}
else{

  return {
    "error":true,
    "message":"Unknown Error"
  }
}




}







exports.login = login;
exports.verifylogin = verifylogin;

exports.validateToken = validateToken;

exports.registeruser = registeruser;
exports.updateprofile=updateprofile;