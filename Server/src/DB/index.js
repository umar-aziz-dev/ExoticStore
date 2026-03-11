import mongoose from "mongoose"
import {DB_NAME} from "../constant.js"
import dns from "dns"

export const Dbconnect = async () => {
     dns.setServers(["1.1.1.1", "8.8.8.8"]);
    const res = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
    console.log("✅ MongoDB Connected Successfully to host:", res.connection.host);

    return res;
}