const { db, connectToMongo } = require("./mongoConnection");
const {
    login,
    verifylogin,
    validateToken,
    registeruser,
    updateprofile,
  } = require("./auth");

async function hostGame(req,res){


    const token = req.headers["authorization"];
    var userdata = await validateToken(token);

    if (userdata) {

        
        // if(userdata[""])




      } else {
        res.status(403).send({ status: 403, err: "Invalid token" });
      }
    







}




exports.hostGame=hostGame;