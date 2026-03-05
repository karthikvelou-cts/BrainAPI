import express from "express";
import {
  createMyQuestion,
  createQuestion,
  deleteMyQuestion,
  deleteQuestion,
  getMyQuestions,
  getQuestions,
  getQuestionsValidators,
  importQuestions,
  questionIdValidator,
  questionUpdateValidators,
  questionValidators,
  updateMyQuestion,
  updateQuestion,
} from "../controllers/questionController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";

const router = express.Router();

router.get("/", getQuestionsValidators, validateRequest, getQuestions);
router.get("/my", protect, getQuestionsValidators, validateRequest, getMyQuestions);
router.post("/my", protect, questionValidators, validateRequest, createMyQuestion);
router.put("/my/:id", protect, questionIdValidator, questionUpdateValidators, validateRequest, updateMyQuestion);
router.delete("/my/:id", protect, questionIdValidator, validateRequest, deleteMyQuestion);
router.post("/", protect, adminOnly, questionValidators, validateRequest, createQuestion);
router.put("/:id", protect, adminOnly, questionIdValidator, questionUpdateValidators, validateRequest, updateQuestion);
router.delete("/:id", protect, adminOnly, questionIdValidator, validateRequest, deleteQuestion);
router.post("/import", protect, adminOnly, validateRequest, importQuestions);

export default router;
