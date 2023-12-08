import express from "express";
import auth from "../middleware/auth";
import userCtrl from "../controllers/userCtrl";
import { validRegister } from "../middleware/valid";

const router = express.Router();

router.patch("/user", auth, userCtrl.updateUser);
router.patch("/reset_password", auth, userCtrl.resetPassword);
router.get("/user/:id", userCtrl.getUser);
router.get("/manage_users", userCtrl.manageUsers);
router.delete("/user/:id", userCtrl.deleteUser);
router.get("/search/users", userCtrl.searchUsers);

router.patch("/user/role", auth, userCtrl.changeRoleUser);


export default router;
