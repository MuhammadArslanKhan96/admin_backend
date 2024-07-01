import nftTransaction from "./routes/nftTransactionRoutes";
import collectionRoutes from "./routes/collectionRoutes";
import nftRoutes from "./routes/nftRoutes";
import stakeTransaction from "./routes/stakeTransaction";
import stake from "./routes/stakingRouter";
import express from "express";
import cors from "cors";
// @ts-ignore
import dotenv from "dotenv";
dotenv.config();
import "./db";
import userRoutes from "./routes/userRoutes";
import session from "express-session";
import { handleError } from "./helper/Responses";
// import mysql from "mysql";

const app = express();
const port = process.env.PORT ? process.env.PORT : 8000;

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set to true for production
      maxAge: 172800000, // 2 days
    },
  })
);
app.use(express.json());
// app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  next();
});
app.use(express.urlencoded({ extended: false }));
app.use("/user", userRoutes);
app.use("/nfts", nftRoutes);
app.use("/transaction", nftTransaction);
app.use("/stake", stake);
app.use("/collections", collectionRoutes);
app.use("/transactionStake", stakeTransaction);
app.get("/logout", async (req: any, res: any) => {
  try {
    req.session.token = null;
    req.session.save(function (err: any) {
      if (err) handleError(err, res);
      req.session.regenerate(function (err: any) {
        if (err) handleError(err, res);
        res.sendStatus(200);
      });
    });
  } catch (error) {
    handleError(error, res);
  }
});
app.listen(port, () => {
  console.log("APP listening " + port);
});
