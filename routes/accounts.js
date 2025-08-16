import { Router } from 'express';
import { validationResult, matchedData, checkSchema, body } from 'express-validator'
import { accountValidation, idValidation } from './utils/validationSchemas.js';
import * as db from '../db/accounts.js';

const router = Router();

router.get('/', async (req, res) => {
  const accounts = await db.getAccounts();
  res.status(200).json({ accounts });
});

router.get('/:id', checkSchema(idValidation), async (req, res) => {
  const result = validationResult(req);
  const data = matchedData(req);
  if(!result.isEmpty())
    return res.status(400).send({ errors: result.array() });
  const account = await db.getAccount(data.id);
  res.status(200).json({ account });
});

router.post('/', checkSchema(accountValidation), async (req, res) => {
  const result = validationResult(req);
  const data = matchedData(req)
  if(!result.isEmpty()) 
    return res.status(400).send({ errors: result.array() });
  const results = await db.createAccount(data);
  res.status(201).json({ id: results[0] })
});

router.patch('/:id', checkSchema(idValidation),
  body('account')
  .if(body('account')
  .notEmpty())
  .isString()
  .withMessage("Account type must be a string"),
  body('balance')
  .if(body('balance')
  .notEmpty())
  .isNumeric()
  .withMessage("Balance must be a number"),
  async (req, res) => {
  const result = validationResult(req);
  const data = matchedData(req);
  if(!result.isEmpty())
    return res.status(400).send({ errors: result.array() });
  await db.updateAccount(data.id, data);
  res.status(200).json({ success: true });
});

router.delete('/:id', checkSchema(idValidation), async (req, res) => {
  const result = validationResult(req);
  const data = matchedData(req);
  if(!result.isEmpty())
    return res.status(400).send({ errors: result.array() });
  await db.deleteAccount(data.id);
  res.status(200).json({ success: true });
});

export default router;