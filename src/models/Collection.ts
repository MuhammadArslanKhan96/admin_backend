import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createCollection = async (collection: any) => {
  try {
    const result = await prisma.collections.create({
      data: {
        user_id: collection.user_id,
        name: collection.name,
        url: collection.url,
        description: collection.description,
        logo_image: collection.logo_image,
        banner_image: collection.banner_image,
        kind: collection.kind,
        category: collection.category,
        sub_category: collection.sub_category,
        blockchain: collection.blockchain,
        collection_address: collection.collection_address,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

export const readCollectionsByCollectionId = async (collectionId: any) => {
  try {
    const result = await prisma.collections.findUnique({
      where: {
        id: collectionId,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

export const readCollectionsByDeveloper = async (userId: any) => {
  try {
    const result = await prisma.collections.findMany({
      where: {
        user_id: userId,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

export const deleteCollection = async (id: any) => {
  try {
    const result = await prisma.collections.delete({
      where: {
        id: id,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

export const getAllCollections = async () => {
  try {
    const result = await prisma.collections.findMany();
    return result;
  } catch (err) {
    throw err;
  }
};
