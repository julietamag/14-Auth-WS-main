const express = require("express");
const cookieParser = require('cookie-parser')
const path = require("path");
const app = express();

const db = require("./db");
const envs = require("./config/envs");

// Express Route File Requires
const authAPI = require("./routes");

app.use(express.static(path.resolve(__dirname, "public")));

app.use(express.json());
app.use(cookieParser())

// Express Routing
app.use("/api", authAPI);
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

db.sync({ force: false }).then(() => {
  console.log("Db connected");
  app.listen(envs.PORT, () => {
    console.log(`Server listening at port ${envs.PORT}`);
  });
});
