// @ts-ignore
import express from "express";
import * as transactionController from "../controllers/nftTransaction";

const router = express.Router();

router.post("/createtransaction", transactionController.createTransaction);
router.get("/readtransaction/:id", transactionController.readTransaction);
router.put("/updatetransaction/:id", transactionController.updateTransaction);
router.delete(
  "/deletetransaction/:id",
  transactionController.deleteTransaction
);
router.get("/getAlltransaction", transactionController.getAllNftTransactions);

export default router;
