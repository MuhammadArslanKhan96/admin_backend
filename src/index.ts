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
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use("/user", userRoutes);
app.use("/nfts", nftRoutes);
app.use("/transaction", nftTransaction);
app.use("/stake", stake);
app.use("/collections", collectionRoutes);
app.use("/transactionStake", stakeTransaction);
app.listen(port, () => {
  console.log("APP listening " + port);
});
