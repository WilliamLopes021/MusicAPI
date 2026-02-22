import connection from '../config/databaseConfig.js';
import app from "../app/app.js";
import "dotenv/config";

(async function server() {
  await connection();
  console.log("logged to database.");
  app.listen(7001, () => console.log("logged to server."));
})();
