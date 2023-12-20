const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://admin:Lr0EeMgmJUJJaAAG@sixgames.vap3vvs.mongodb.net/?retryWrites=true&w=majority";
var ObjectId = require("mongodb").ObjectId;

var mongo = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectToMongo() {
  try {
    await mongo.connect();
    // console.log('Connected to MongoDB');
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

// Export the db object
exports.db = mongo.db("sixgames");

// Export the connect function
exports.connectToMongo = connectToMongo;
