import { Router } from "express";
import {
  checkSchema,
  validationResult,
  matchedData,
  body,
} from "express-validator";
import * as db from "../db/categories.js";
import {
  categoriesValidation,
  idValidation,
} from "./utils/validationSchemas.js";

const router = Router();

router.get("/", async (req, res) => {
  const categories = await db.getCategories();
  res.status(200).json({ categories });
});

router.get("/:id", checkSchema(idValidation), async (req, res) => {
  const result = validationResult(req);
  const data = matchedData(req);
  if (!result.isEmpty())
    return res.status(400).send({ errors: result.array() });
  const category = await db.getCategory(data.id);
  res.status(200).json({ category });
});

router.post(
  "/",
  checkSchema(categoriesValidation),
  body("budget")
    .if(body("budget").notEmpty())
    .isNumeric()
    .withMessage("Budget must be a numeric value"),
  async (req, res) => {
    const result = validationResult(req);
    const data = matchedData(req);
    if (!result.isEmpty())
      return res.status(400).send({ errors: result.array() });
    const results = await db.createCategory(data);
    res.status(201).json({ id: results[0] });
  }
);

router.patch(
  "/:id",
  checkSchema(idValidation),
  body('category')
  .if(body('category')
  .notEmpty())
  .isString()
  .withMessage("Category type must be a string"),
  body('budget')
  .if(body('budget')
  .notEmpty())
  .isNumeric()
  .withMessage("Budget must be a number"),
  async (req, res) => {
    const result = validationResult(req);
    const data = matchedData(req);
    if (!result.isEmpty())
      return res.status(400).send({ errors: result.array() });
    await db.updateCategory(data.id, data);
    res.status(200).json({ success: true });
  }
);

router.delete("/:id", checkSchema(idValidation), async (req, res) => {
  const result = validationResult(req);
  const data = matchedData(req);
  if (!result.isEmpty())
    return res.status(400).send({ errors: result.array() });
  await db.deleteCategory(data.id);
  res.status(200).json({ success: true });
});

export default router;
