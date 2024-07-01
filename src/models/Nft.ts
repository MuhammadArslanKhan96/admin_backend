import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createNft = async (nft: any) => {
  try {
    const result = await prisma.nft.create({ data: nft });
    return result;
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const readNft = async (id: number) => {
  try {
    const result = await prisma.nft.findFirst({ where: { id } });
    return result;
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const updateNft = async (id: number | any, updates: Partial<any>) => {
  try {
    const result = await prisma.nft.update({ where: { id }, data: updates });
    return result;
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const deleteNft = async (id: number | any) => {
  try {
    const result = await prisma.nft.delete({ where: { id } });
    return result;
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const getAllNfts = async () => {
  try {
    const result = await prisma.nft.findMany();
    return result;
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const buyNft = async (nftId: number, buyerAddress: string) => {
  try {
    const nft = await prisma.nft.findUnique({ where: { id: nftId } });
    if (nft && nft.supply_quantity > 0) {
      const result = await prisma.nft.update({
        where: { id: nftId },
        data: {
          secondary_owner: {
            buyer: {
              wallet: buyerAddress,
            },
          },
          supply_quantity: { decrement: 1 },
        },
      });
      return result;
    } else {
      const result = await prisma.nft.update({
        where: { id: nftId },
        data: {
          secondary_owner: {
            buyer: {
              wallet: buyerAddress,
            },
          },
        },
      });
      return result;
    }
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const getNftsByCollectionId = async (collectionId: number) => {
  try {
    const result = await prisma.nft.findMany({
      where: { collection_id: collectionId },
    });
    return result;
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};
