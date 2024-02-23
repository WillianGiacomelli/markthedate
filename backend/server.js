//modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { MONGO_DB_URI } = require("./helpers/env");
const url = MONGO_DB_URI;

//routes
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");
const eventRouter = require("./routes/event.routes");

// config
const port = 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// atrelar rotas
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/event", eventRouter);

// connection with mongodb
mongoose.connect(`${url}`);

app.listen(port, () => {
  console.log(`O servidor está rodando na porta ${port}`);
});
