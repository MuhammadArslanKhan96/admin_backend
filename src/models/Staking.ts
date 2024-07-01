import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all stakes
export const getAllstakes = async () => {
  try {
    // @ts-ignore
    const stakes = await prisma.staking.findMany();
    if (stakes) {
      return stakes;
    } else {
      return "Something Went Wrong";
    }
  } catch (e: any) {
    return `Error: ${e.message}`;
  }
};

// Get stake by id
export const getstakeById = async (id: number) => {
  try {
    // @ts-ignore
    const stake = await prisma.staking.findUnique({
      where: { id },
    });
    if (stake) {
      return stake;
    } else {
      return "stake not found";
    }
  } catch (e: any) {
    return `Error: ${e.message}`;
  }
};

// Get stake by wallet
export const getstakeByWallet = async (wallet: string) => {
  try {
    // @ts-ignore
    const stake = await prisma.staking.findFirst({
      where: { creator_wallet: wallet },
    });
    if (stake) {
      return stake;
    } else {
      return "stake not found";
    }
  } catch (e: any) {
    return `Error: ${e.message}`;
  }
};

// Create stake
export const createstake = async (data: any) => {
  const {
    time,
    type,
    wallet,
    owner_id,
    created_at,
    staker_id,
    nft_id,
    collection_id,
  } = data;
  try {
    // @ts-ignore
    console.log({
      time: time,
      type: type,
      creator_wallet: wallet,
      created_by: owner_id,
      created_at: created_at,
      nft_id: nft_id ? nft_id : 0,
      collection_id: collection_id ? collection_id : 0,
      staked_user: staker_id,
      staked_at: created_at,
    });
    const stake = await prisma.staking.create({
      data: {
        time: time,
        type: type,
        creator_wallet: wallet,
        created_by: owner_id,
        created_at: created_at,
        nft_id: nft_id ? nft_id : 0,
        collection_id: collection_id ? collection_id : 0,
        staked_user: staker_id,
        staked_at: created_at,
      },
    });
    if (stake) {
      return stake;
    } else {
      return "UnExpected Error";
    }
  } catch (e: any) {
    return `Error: ${e.message}`;
  }
};

// Update stake by id
export const updatestakeById = async (id: number, data: any) => {
  try {
    // @ts-ignore
    const stake = await prisma.staking.update({
      where: { id },
      data,
    });
    if (stake) {
      return stake;
    } else {
      return "stake not found";
    }
  } catch (e: any) {
    return `Error: ${e.message}`;
  }
};

// Delete stake by id
export const deletestakeById = async (id: number) => {
  try {
    // @ts-ignore
    const stake = await prisma.staking.delete({
      where: { id },
    });
    if (stake) {
      return "stake deleted successfully";
    } else {
      return "stake not found";
    }
  } catch (e: any) {
    return `Error: ${e.message}`;
  }
};

// Get stake by nft_id
export const getstakeByNftId = async (id: number) => {
  try {
    // @ts-ignore
    // @ts-ignore
    const stake = await prisma.staking.findFirst({
      where: {
        // @ts-ignore
        nft_id: id,
      },
    });
    return stake ?? "stake not found";
  } catch (e: any) {
    return { error: `Error: ${e.message}` };
  }
};

// Get stake by collection_id
export const getstakeByCollectionId = async (id: number) => {
  try {
    const stake = await prisma.staking.findFirst({
      where: { collection_id: id },
    });
    return stake ?? "stake not found";
  } catch (e: any) {
    return { error: `Error: ${e.message}` };
  }
};

// Get staked NFTs
export const getStakedNfts = async () => {
  try {
    const stakedNfts = await prisma.staking.findMany({
      where: {
        collection_id: 0,
      },
    });
    return stakedNfts;
  } catch (error: any) {
    console.error(error);
    throw new Error(`Failed to fetch staked NFTs: ${error.message}`);
  }
};

// Get staked Collections
export const getStakedCollections = async () => {
  try {
    const stakedCollections = await prisma.staking.findMany({
      where: {
        nft_id: 0,
      },
    });
    return stakedCollections;
  } catch (error: any) {
    console.error(error);
    throw new Error(`Failed to fetch staked collections: ${error.message}`);
  }
};
