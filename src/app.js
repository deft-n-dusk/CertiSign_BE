const express = require("express");
const connectDB = require("./config/database")
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");

app.use(
  cors({
    origin: [
      "http://localhost:5173", // local dev
    //   "https://certi-sign-ui.vercel.app" // deployed frontend
    ],
    credentials: true,
  })
);


app.use(cookieParser());
app.use(express.json());

const authRouter = require("./routes/authRouter.js");
app.use("/", authRouter);

const authCheckRouter = require("./routes/authCheckRouter.js");
app.use("/", authCheckRouter);

const pdfRouter = require("./routes/pdfRouter.js");
app.use("/", pdfRouter);




// Connect to database and start server
const PORT = process.env.PORT || 2713;

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(PORT, () => {
      console.log(`Server is successfully listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected", err);
  });


