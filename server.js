import app from "./app.js";
import connection from "./src/database/dbConnection.js";

(async function server() {
  await connection();
  console.log("logged to database.");
  app.listen(7001, () => console.log("logged to server."));
})();
