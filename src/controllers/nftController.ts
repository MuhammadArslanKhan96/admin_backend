import express from "express";
import * as Nft from "../models/Nft";
import {
  handleCreateResponse,
  handleReadResponse,
  handleUpdateResponse,
  handleDeleteResponse,
  handleGetAllResponse,
  successMessage,
  errorMessage,
  handleError,
} from "../helper/Responses";
// import * as NftMarket from "../models/NftMarket";
import { createTransaction } from "../models/NfTransaction";
// import { createAuction } from "../models/NftAuction";

export const createNft = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const nft = await Nft.createNft(req.body);
    if (!nft) throw new Error("Failed to create the NFT");
    const nftcompelted = { nft };
    handleCreateResponse(res, nftcompelted, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const readNft = async (req: express.Request, res: express.Response) => {
  try {
    const nftId = Number(req.params.id);
    const foundNft = await Nft.readNft(nftId);
    handleReadResponse(res, foundNft, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const updateNft = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const updatedNft = await Nft.updateNft(req.params.id, req.body);
    handleUpdateResponse(res, updatedNft, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const deleteNft = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const deletedCount = await Nft.deleteNft(req.params.id);
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

export const getAllNfts = async (
  _req: express.Request,
  res: express.Response
) => {
  try {
    const allNfts = await Nft.getAllNfts();
    handleGetAllResponse(res, allNfts, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const buyNft = async (req: express.Request, res: express.Response) => {
  const nftId = req.body.id;
  const buyerAddress = req.body.buyerAddress;
  const amount = req.body.amount;
  // const currentDate = new Date();
  // const insurance_expiryDate = new Date(currentDate.getTime() + insurance_time);
  // Input Validation
  if (!nftId || !buyerAddress) {
    return res.status(400).json({ error: "Invalid request parameters" });
  }

  try {
    const updatedNft = await Nft.buyNft(nftId, buyerAddress);

    const currentDate = new Date();
    const isoString = currentDate.toISOString().slice(0, 10);
    const transaction_time = isoString.replace("-", "/").replace("-", "/");
    const nftData = await Nft.readNft(nftId);
    const nft_transaction = {
      nfttoken_id: nftId,
      nft_id: nftId,
      buyer: buyerAddress,
      seller: nftData ? nftData.primary_owner : "seller",
      transaction_hash: "xxxxxxx",
      transaction_time: transaction_time,
      price: amount,
    };
    const nftTransaction = await createTransaction(nft_transaction);
    console.log(nftTransaction, "Check");
    if (!updatedNft) {
      return res.status(404).json({ error: "NFT not found" });
    }

    // if (!nftMarket) {
    // return res
    //   .status(404)
    //   .json({ error: "NFT not Listed to the Nft Market" });
    // }

    if (!nft_transaction) {
      return res.status(404).json({ error: "NFT Transaction Record Failed" });
    }

    const buynft = { updatedNft, nftTransaction };
    // Handle success response
    handleCreateResponse(res, buynft as any, successMessage, errorMessage);
  } catch (err) {
    // Handle errors
    handleError(err, res);
  }
};

export const getNftsByCollectionId = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const collectionId = Number(req.params.collectionid);
    const nfts = await Nft.getNftsByCollectionId(collectionId);
    handleCreateResponse(
      res,
      nfts,
      "NFT list of your collection",
      errorMessage
    );
  } catch (err) {
    handleError(err, res);
  }
};
