import express from "express";
import * as userController from "../controllers/userController";

const router = express.Router();

router.get("/read/:id", userController.readUser);
router.post("/wallet", userController.readUserWallet);
router.post("/emailCheck", userController.emailCheck);
router.put("/update/:id", userController.updateUser);
router.put("/updateImg/:id", userController.updateUserImg);
router.delete("/delete/:id", userController.deleteUser);
router.get("/getAll", userController.getAllUsers);
router.post(
  "/signup",
  express.urlencoded({ extended: false }),
  userController.signupUser
);
router.post(
  "/signin",
  express.urlencoded({ extended: false }),
  userController.signinUser
);
router.post("/forgetPassword", userController.updateUserPasswordController);
router.post("/checkemail", userController.checkEmailController);
router.get("/checkUser", userController.checkUser);

export default router;
