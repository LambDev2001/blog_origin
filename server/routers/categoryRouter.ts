import express from "express";
import categoryCtl from "../controllers/categoryCtrl";
import auth from "../middleware/auth";

const router = express.Router();

router
  .route("/category")
  .get(categoryCtl.getCategories)
  .post(auth, categoryCtl.createCategory);

router
  .route("/category/:id")
  .patch(auth, categoryCtl.updateCategory)
  .delete(auth, categoryCtl.deleteCategory);

export default router;
