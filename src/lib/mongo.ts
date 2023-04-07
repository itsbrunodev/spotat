import { connect, connection } from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) throw Error("Missing MONGO_URI");

const options: any = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

export const connectToDatabase = async () => {
  /* only connect if there isn't a connection already established */
  if (!connection.readyState) {
    connect(MONGO_URI, options);
  }
};
