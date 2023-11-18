import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://mgoktashk:hkuKOChku.@cluster0.kh756qg.mongodb.net/?retryWrites=true&w=majority";
export const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect(err => {
  const collection = client.db("mdbs").collection("travels");
  client.close();
});