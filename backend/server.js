const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
dotenv.config();

// middleware
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

// routes
app.use("/", require("./routes/todos"));

// server
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (error) {
    console.error(error.message);
  }
};

start();

module.exports = app;
