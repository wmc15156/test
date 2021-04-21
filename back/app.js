const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const db = require("./models");
const postsRouter = require("./routes/posts");

const app = express();

dotenv.config();
db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공!");
  })
  .catch((err) => {
    console.error(err, "db 에러");
  });

app.use(morgan("dev"));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// start router

app.use("/posts", postsRouter);

app.get("/", (req, res) => {
  res.send("hello express");
});

app.listen(8000, () => {
  console.log("서버 실행 중!");
});
