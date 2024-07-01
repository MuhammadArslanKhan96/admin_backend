import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Transaction {
  nfttoken_id: number;
  nft_id: number;
  buyer: string;
  seller: string;
  transaction_hash: string;
  transaction_time: string;
  price: number;
}

export const createTransaction = async (transaction: Transaction) => {
  try {
    const result = await prisma.nft_transaction.create({
      data: {
        nfttoken_id: transaction.nfttoken_id,
        nft_id: transaction.nft_id,
        buyer: transaction.buyer,
        seller: transaction.seller,
        transaction_hash: transaction.transaction_hash,
        transaction_time: transaction.transaction_time,
        price: transaction.price,
      },
    });
    return result;
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const readTransaction = async (id: number) => {
  try {
    const result = await prisma.nft_transaction.findUnique({
      where: {
        id,
      },
    });
    return result;
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const updateTransaction = async (
  id: number,
  updates: Partial<Transaction>
) => {
  try {
    const result = await prisma.nft_transaction.update({
      where: {
        id,
      },
      data: {
        nfttoken_id: updates.nfttoken_id,
        nft_id: updates.nft_id,
        buyer: updates.buyer,
        seller: updates.seller,
        transaction_hash: updates.transaction_hash,
        transaction_time: updates.transaction_time,
        price: updates.price,
      },
    });
    return result;
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const deleteTransaction = async (id: number) => {
  try {
    const result = await prisma.nft_transaction.delete({
      where: {
        id,
      },
    });
    return result;
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const getAllNftTransactions = async () => {
  try {
    const result = await prisma.nft_transaction.findMany();
    return result;
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

// export const getAllTransactionsById = async (nft_id: number) => {
//   try {
//     const result = await prisma.nft_transaction.findMany({
//       where: {
//         nft_id,
//       },
//     });
//     return result;
//   } catch (err) {
//     const error = err as Error;
//     throw error;
//   }
// };
