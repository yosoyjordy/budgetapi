import { Router } from "express";
import {
  validationResult,
  matchedData,
  checkSchema,
  body,
  check,
} from "express-validator";
import { idValidation, walletsValidation } from "./utils/validationSchemas.js";
import * as db from "../db/wallets.js";

const router = Router();

router.get("/", async (req, res) => {
  const wallet = await db.getActiveWallet();
  res.status(200).json({ wallet });
});

router.get("/:id", checkSchema(idValidation), async (req, res) => {
  const result = validationResult(req);
  const data = matchedData(req);
  if (!result.isEmpty())
    return res.status(400).send({ errors: result.array() });
  const wallet = await db.getWallet(data.id);
  res.status(200).json({ wallet });
});

router.post(
  "/",
  body("date")
    .if(body("date").notEmpty())
    .isString()
    .withMessage("Date must be a date format"),
  body("active")
    .if(body("active").notEmpty())
    .isInt()
    .withMessage("Active must be a number"),
  checkSchema(walletsValidation),
  async (req, res) => {
    const result = validationResult(req);
    const data = matchedData(req);
    if (!result.isEmpty())
      return res.status(400).send({ errors: result.array() });
    const results = await db.createWallet(data);
    res.status(201).json({ id: results[0] });
  }
);

router.patch(
  "/:id",
  checkSchema(idValidation),
  checkSchema(walletsValidation),
  async (req, res) => {
    const result = validationResult(req);
    const data = matchedData(req);
    if (!result.isEmpty())
      return res.status(400).send({ errors: result.array() });
    await db.updateWallet(data.id, data);
    res.status(200).json({ success: true });
  }
);

router.delete("/:id", checkSchema(idValidation), async (req, res) => {
  const result = validationResult(req);
  const data = matchedData(req);
  if (!result.isEmpty())
    return res.status(400).send({ errors: result.array() });
  await db.desactivateWallet(data.id);
  res.status(200).json({ success: true });
});

export default router;
