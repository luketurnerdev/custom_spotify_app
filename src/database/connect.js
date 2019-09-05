const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://luke1232:ZXCasdQWE123@cluster0-opxhg.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true});
mongoose.Promise = global.Promise;
const connection = mongoose.connection;

//Output if mongo connction was successful or not
connection.on("error", console.log);
connection.once('open', () => {
  console.log("Connection to MongoDB established successfully.");
})