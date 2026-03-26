import app from "../Server/src/app.js";
import { Dbconnect } from "../Server/src/DB/index.js";

let connectionPromise;

async function ensureDbConnection() {
  if (!connectionPromise) {
    connectionPromise = Dbconnect().catch((error) => {
      connectionPromise = undefined;
      throw error;
    });
  }

  await connectionPromise;
}

export default async function handler(req, res) {
  await ensureDbConnection();
  return app(req, res);
}
