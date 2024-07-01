import express from "express";
import * as User from "../models/User";
const jwt = require("jsonwebtoken");
const secretKey = "3650"; // Replace with your actual secret key
import {
  successMessage,
  errorMessage,
  handleGetAllResponse,
  handleError,
} from "../helper/Responses";
import {
  handleReadResponse,
  handleUpdateResponse,
  handleDeleteResponse,
} from "../helper/Responses";

export const readUser = async (req: express.Request, res: express.Response) => {
  try {
    const player = await User.readUser(parseInt(req.params.id));
    handleReadResponse(res, player, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const readUserWallet = async (
  req: express.Request,
  res: express.Response
) => {
  const { wallet } = req.body;
  try {
    if (wallet === "") {
      throw new Error("EmptyWallet not Found");
    }
    const player = await User.readUserByWallet(wallet || null);
    // const player = await User.readPlayerByWallet(wallet, zetawallet);
    handleReadResponse(res, player, successMessage, errorMessage);
  } catch (err) {
    res.send(err);
    handleError(err, res);
  }
};

export const emailCheck = async (
  req: express.Request,
  res: express.Response
) => {
  const { email } = req.body;
  try {
    const player = await User.emailChecker(email);
    // res.status(200).send(player);
    handleReadResponse(res, player, successMessage, errorMessage);
  } catch (err) {
    res.send(err);
    handleError(err, res);
  }
};

export const updateUserImg = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const player = await User.updateUserImage(
      parseInt(req.params.id),
      req.body
    );
    handleUpdateResponse(res, player, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const player = await User.updateUser(parseInt(req.params.id), req.body);
    handleUpdateResponse(res, player, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const deletedCount = await User.deleteUser(parseInt(req.params.id));
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

export const getAllUsers = async (
  _req: express.Request,
  res: express.Response
) => {
  try {
    console.log("getall");
    const allPlayers = await User.getAllUsers();

    handleGetAllResponse(res, allPlayers, successMessage, errorMessage);
  } catch (err) {
    handleError(err, res);
  }
};

export const signupUser = async (req: any, res: express.Response) => {
  try {
    const userWallet = await User.readUserByWallet(req.body.wallet);
    if (!userWallet) {
      const user = await User.signupUser(req.body);
      const token = jwt.sign(
        { userId: user.id, email: user.email, role: "user" },
        "3650",
        { expiresIn: "30d" } // You can adjust the expiration time
      );

      req.session.regenerate(function (err: any) {
        if (err) handleError(err, res);
        // store user information in session, typically a user id
        req.session.token = token;
        // save the session before redirection to ensure page
        // load does not happen before session is saved
        req.session.regenerate(function (err: any) {
          if (err) return handleError(err, res);
          res.status(201).send({
            message: "player signed up successfully",
            data: { user, token },
          });
        });
      });
    } else {
      res.status(409).send({
        message: "User Wallet Already exists",
      });
    }
  } catch (err) {
    handleError(err, res);
  }
};

// export const signinPlayer = async (
//   req: express.Request,
//   res: express.Response
// ) => {
//   try {
//     const { email, password } = req.body;
//     const player = await User.signinPlayer(email, password);

//     if (player) {
//       console.log(User.id);
//       // Generate JWT token
//       const token = jwt.sign(
//         { userId: User.id, email: User.email },
//         secretKey,
//         { expiresIn: "30d" } // You can adjust the expiration time
//       );

//       res.status(200).send({
//         message: "player signed in successfully",
//         data: { player, token },
//       });
//     } else {
//       res.status(401).send({ error: "Invalid email or password" });
//     }
//   } catch (err) {
//     handleError(err, res);
//   }
// };
let tokenJWT: any;
export const signinUser = async (req: any, res: express.Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.signinUser(email, password);

    if (user) {
      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email, role: "player" },
        "3650",
        { expiresIn: "30d" }
      );
      tokenJWT = token;
      res.status(200).send({
        message: "Player signed in successfully",
        data: { user, token },
      });
      // req.session.regenerate(function (err: any) {
      //   if (err) handleError(err, res);
      //   // store user information in session, typically a user id
      //   req.session.token = token;
      //   // save the session before redirection to ensure page
      //   // load does not happen before session is saved
      //   req.session.save(function (err: any) {
      //     if (err) return handleError(err, res);
      //     res.status(200).send({
      //       message: "Player signed in successfully",
      //       data: { user, token },
      //     });
      //   });
      // });

      // Set the token as a cookie in the response
      // res.cookie("jwtToken", token, {
      //   httpOnly: true,
      //   maxAge: 172800,
      //   secure: true, // Set to false for development on localhost
      //   sameSite: "none",
      //   // domain: "*.pixpel.io,localhost",
      // });

      // 172800 seconds = 2 days
    } else {
      res.status(401).send({ error: "Invalid email or password" });
    }
  } catch (err) {
    handleError(err, res);
  }
};

export const checkUser = async (req: any, res: express.Response) => {
  try {
    res.status(200).send({ user: req.user });
  } catch (err) {
    handleError(err, res);
  }
};

export const updateUserPasswordController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.updateUserPassword(email, newPassword);
    res.status(200).json({ message: "Password updated successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkEmailController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email } = req.body;
    const emailExists = await User.emailChecker(email);

    res.status(200).json({ exists: emailExists });
  } catch (err) {
    console.error("Error checking email:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
