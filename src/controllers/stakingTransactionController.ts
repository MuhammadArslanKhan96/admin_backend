import express from "express";
import * as Transaction from "../models/StakingTransaction";
import {
  successMessage,
  errorMessage,
  handleGetAllResponse,
  handleError,
} from "../helper/Responses";
import {
  handleCreateResponse,
  handleReadResponse,
  handleUpdateResponse,
  handleDeleteResponse,
} from "../helper/Responses";

export const createTransaction = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const transaction = await Transaction.createStakeTransaction(req.body);
    handleCreateResponse(res, transaction, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const readTransaction = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const transaction = await Transaction.getStakeTransactionById(
      parseInt(req.params.id)
    );
    handleReadResponse(res, transaction, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const updateTransaction = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const transaction = await Transaction.updateStakeTransactionById(
      parseInt(req.params.id),
      req.body
    );
    handleUpdateResponse(res, transaction, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const deleteTransaction = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const deletedCount = await Transaction.deleteStakeTransactionById(
      parseInt(req.params.id)
    );
    handleDeleteResponse(
      res,
      deletedCount as any,
      successMessage,
      errorMessage
    );
  } catch (err) {
    handleError(err, res);
  }
};

export const getAllStakeTransactions = async (
  _req: express.Request,
  res: express.Response
) => {
  try {
    const allNftTransactions = await Transaction.getAllStakeTransactions();
    handleGetAllResponse(
      res,
      allNftTransactions as any,
      successMessage,
      errorMessage
    );
  } catch (err) {
    handleError(err, res);
  }
};
