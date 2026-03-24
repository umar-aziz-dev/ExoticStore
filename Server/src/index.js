import dotenv from "dotenv"
dotenv.config();
import { Dbconnect } from "./DB/index.js";
import app from "./app.js"

Dbconnect().then(()=>console.log("mongodb connection successfull")).catch((err)=>{console.log("cannnt connect to db : ", err)})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
