import express from "express";
import {
  getAllstakesController,
  getstakeByIdController,
  getstakeByWalletController,
  createstakeController,
  updatestakeByIdController,
  deletestakeByIdController,
  getstakeByNft,
  getstakeByCollection,
  getstakeNfts,
  getstakeCollection,
} from "../controllers/stakingController";

const router = express.Router();

// Get all stakes
router.get("/", getAllstakesController);

// Get stake by id
router.get("/read/:id", getstakeByIdController);

// Get stake by wallet
router.get("/wallet", getstakeByWalletController);

// Create stake
router.post("/", createstakeController);

// Update stake by id
router.put("/update/:id", updatestakeByIdController);

// Delete stake by id
router.delete("/delete/:id", deletestakeByIdController);

// getstakeByNft

router.get("/getByNft/:id", getstakeByNft);
// getstakeByCollection

router.get("/getByCollection/:id", getstakeByCollection);
// getstakeNfts

router.get("/getstakeNft", getstakeNfts);
// getstakeCollection

router.get("/getstakeCollection", getstakeCollection);

export default router;
