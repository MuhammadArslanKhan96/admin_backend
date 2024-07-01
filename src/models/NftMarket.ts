import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createNftMarket = async (nftMarket: NftMarket) => {
  try {
    const result = await prisma.nftmarket.create({ data: nftMarket });
    return result;
  } catch (err) {
    throw err;
  }
};

export const readNftMarket = async (id: number) => {
  try {
    const result = await prisma.nftmarket.findUnique({
      where: { id },
      include: {
        nft: true,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

export const updateNftMarket = async (
  id: number,
  updates: Partial<NftMarket>
) => {
  try {
    const result = await prisma.nftmarket.update({
      where: { id },
      data: updates,
    });
    return result;
  } catch (err) {
    throw err;
  }
};

export const deleteNftMarket = async (id: number) => {
  try {
    const result = await prisma.nftmarket.delete({ where: { id } });
    return result;
  } catch (err) {
    throw err;
  }
};

export const getAllNftNftMarkets = async () => {
  try {
    const result = await prisma.nftmarket.findMany({
      include: {
        nft: true,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};
