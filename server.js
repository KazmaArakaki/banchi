import express from "express";
import bodyParser from "body-parser";

import router from "./router";

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

router(app);

app.listen(3000, () => {
  console.log("Server listening on port 3000.");
});