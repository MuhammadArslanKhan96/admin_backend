import { Request, Response } from "express";
import {
  getAllstakes,
  getstakeById,
  getstakeByWallet,
  createstake,
  updatestakeById,
  deletestakeById,
  getstakeByNftId,
  getstakeByCollectionId,
  getStakedCollections,
  getStakedNfts,
} from "../models/Staking";
import * as Transaction from "../models/StakingTransaction";

// Get all stakes
export const getAllstakesController = async (req: Request, res: Response) => {
  try {
    const stakes = await getAllstakes();
    res.status(200).json(stakes);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get stake by id
export const getstakeByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const stake = await getstakeById(id);
    res.status(200).json(stake);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get stake by wallet
export const getstakeByWalletController = async (
  req: Request,
  res: Response
) => {
  try {
    const wallet = req.query.wallet as string;
    const stake = await getstakeByWallet(wallet);
    res.status(200).json(stake);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Create stake
export const createstakeController = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const stake = await createstake(data);
    try {
      Transaction.createStakeTransaction(data);
    } catch (e: any) {
      res.status(400).send({ error: e.message });
      return;
    }
    res.status(201).json(stake);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Update stake by id
export const updatestakeByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;
    const stake = await updatestakeById(id, data);
    res.status(200).json(stake);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Delete stake by id
export const deletestakeByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id);
    const message = await deletestakeById(id);
    res.status(200).json({ message });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// get stake by nft
export const getstakeByNft = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const stake = await getstakeByNftId(id);
    res.status(200).json(stake);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getstakeByCollection = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const stake = await getstakeByCollectionId(id);
    res.status(200).json(stake);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get all of nft stakes
export const getstakeNfts = async (req: Request, res: Response) => {
  try {
    const stakes = await getStakedNfts();
    res.status(200).json(stakes);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get all of collection stakes
export const getstakeCollection = async (req: Request, res: Response) => {
  try {
    const stakes = await getStakedCollections();
    res.status(200).json(stakes);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
