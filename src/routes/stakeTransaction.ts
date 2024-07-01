// @ts-ignore
import express from "express";
import * as transactionController from "../controllers/stakingTransactionController";

const router = express.Router();
router.get("/getAll", transactionController.getAllStakeTransactions);
router.post("/createtransaction", transactionController.createTransaction);
router.get("/readtransaction/:id", transactionController.readTransaction);
router.put("/updatetransaction/:id", transactionController.updateTransaction);
router.delete(
  "/deletetransaction/:id",
  transactionController.deleteTransaction
);

export default router;
