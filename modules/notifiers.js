const { db, connectToMongo } = require("./mongoConnection");
const { print } = require("./logger");

const { publishMessage } = require("./mqttconnection");
var i = 1;

function updateBalanceNotifier() {
  setInterval(() => {
    try {
      console.log(i);
      settleWinnings();
    } catch (ee) {
      print(ee);
    }
  }, 10000);
}

async function settleWinnings() {
  i = i + 1;

  // console.log("settle winnings call");

  const games = await db.collection("games").find().toArray();

  // print(games);
  var bulkOps = [];

  for (const game of games) {
    publishMessage("games", {
      data: game,
    });
    const { uid, amount } = game;

    // Prepare compound query for user update
    const query = { uid };
    const update = { $inc: { walletBalance: amount } }; // Increment wallet balance by amount
    const updateOperation = {
      updateOne: {
        filter: query,
        update,
      },
    };

    bulkOps.push(updateOperation);
  }

  await db.collection("users").bulkWrite(bulkOps);
}

exports.updateBalanceNotifier = updateBalanceNotifier;
