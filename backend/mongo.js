import mongoose from "mongoose";
import 'dotenv/config'

const password = process.env.MONGO_PASSWORD;

const url =
  `mongodb://linux-api:${password}@linux-api.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@linux-api@`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", noteSchema);

const person = new Person({
  name: "kelson",
  number: "86988966111",
});

// person.save().then((res) => {
//   console.log("new person salve");
//   mongoose.connection.close();
// });
Person.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})
