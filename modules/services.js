const crypto = require("crypto");

function generateRandomString(length, isint) {
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  if (isint) {
    characters = "0123456789";
  }

  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}

function validate(data) {
  if (data != undefined && data != null && data != "") {
    return true;
  } else {
    return false;
  }
}

exports.generateRandomString = generateRandomString;
exports.validate = validate;
