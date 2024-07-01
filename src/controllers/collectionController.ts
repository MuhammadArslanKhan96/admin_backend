import express from "express";
import * as Collection from "../models/Collection";
import * as User from "../models/User";
import {
  successMessage,
  errorMessage,
  handleGetAllResponse,
  handleError,
} from "../helper/Responses";
import {
  handleCreateResponse,
  handleReadResponse,
  handleDeleteResponse,
} from "../helper/Responses";

export const createCollection = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const isAdmin = await User.readUser(req.body.user_id);
    console.log(isAdmin);
    if (isAdmin?.role === "admin") {
      const collection = await Collection.createCollection(req.body);
      handleCreateResponse(res, collection, successMessage, errorMessage);
    } else {
      res
        .status(409)
        .send({ message: "Only Admins are allowed to Create Collections" });
    }
    return;
  } catch (err) {
    handleError(err, res);
  }
};

export const readCollectionsByCollectionId = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const collections = await Collection.readCollectionsByCollectionId(
      parseInt(req.params.collectionId)
    );
    handleReadResponse(res, collections, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const readCollectionsByDeveloper = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const collections = await Collection.readCollectionsByDeveloper(
      parseInt(req.params.userId)
    );
    handleReadResponse(res, collections, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const deleteCollection = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const deletedCount = await Collection.deleteCollection(
      Number(req.params.id)
    );

    console.log(deletedCount);
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

export const getAllCollections = async (
  _req: express.Request,
  res: express.Response
) => {
  try {
    const allCollections = await Collection.getAllCollections();
    res.status(200).send(allCollections);
    // handleGetAllResponse(res, allCollections.\, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};
