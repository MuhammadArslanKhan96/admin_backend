import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Get all stake transactions
export const getAllStakeTransactions = async () => {
  try {
    const stakeTransactions = await prisma.stake_transactions.findMany();
    if (stakeTransactions) {
      return stakeTransactions;
    } else {
      return "Something Went Wrong";
    }
  } catch (e: any) {
    return `Error: ${e.message}`;
  }
};

// Get stake transaction by id
export const getStakeTransactionById = async (id: number) => {
  try {
    const stakeTransaction = await prisma.stake_transactions.findUnique({
      where: { id },
    });
    if (stakeTransaction) {
      return stakeTransaction;
    } else {
      return "stake transaction not found";
    }
  } catch (e: any) {
    return `Error: ${e.message}`;
  }
};

// Get stake transaction by stake id
export const getStakeTransactionByStakeId = async (stakeId: number) => {
  try {
    const stakeTransaction = await prisma.stake_transactions.findFirst({
      where: { stake_id: stakeId },
    });
    if (stakeTransaction) {
      return stakeTransaction;
    } else {
      return "stake transaction not found";
    }
  } catch (e: any) {
    return `Error: ${e.message}`;
  }
};

// Create stake transaction
export const createStakeTransaction = async (data: any) => {
  const { stake_id, staker_wallet, nft_id, collection_id, amount } = data;

  try {
    const stakeTransaction = await prisma.stake_transactions.create({
      data: {
        stake_id,
        staker_wallet,
        nft_id,
        collection_id,
        amount,
      },
    });
    if (stakeTransaction) {
      return stakeTransaction;
    } else {
      return "UnExpected Error";
    }
  } catch (e: any) {
    return `Error: ${e.message}`;
  }
};

// Update stake transaction by id
export const updateStakeTransactionById = async (id: number, data: any) => {
  try {
    const stakeTransaction = await prisma.stake_transactions.update({
      where: { id },
      data,
    });
    if (stakeTransaction) {
      return stakeTransaction;
    } else {
      return "stake transaction not found";
    }
  } catch (e: any) {
    return `Error: ${e.message}`;
  }
};

// Delete stake transaction by id
export const deleteStakeTransactionById = async (id: number) => {
  try {
    const stakeTransaction = await prisma.stake_transactions.delete({
      where: { id },
    });
    if (stakeTransaction) {
      return "stake transaction deleted successfully";
    } else {
      return "stake transaction not found";
    }
  } catch (e: any) {
    return `Error: ${e.message}`;
  }
};
