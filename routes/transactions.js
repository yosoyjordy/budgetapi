import { Router } from 'express';
import { body ,validationResult, checkSchema, matchedData } from 'express-validator';
import * as db from '../db/transactions.js';
import { idValidation, transactionValidation } from './utils/validationSchemas.js';

const router = Router();

router.get('/', async (req, res) => {
  const { transactionTypeId } = req.query;
  const transactions = await db.getTransactions(transactionTypeId);
  res.status(200).json({ transactions })
});

router.get('/:id', checkSchema(idValidation), async (req, res) => {
    const result = validationResult(req);
    const data = matchedData(req);
    if(!result.isEmpty())
      return res.status(400).send({ errors: result.array() });
    const transaction = await db.getTransaction(data.id);
    res.status(200).json({ transaction });
  });

router.post('/',
  body('amount_type')
  .if(body('amount_type')
  .notEmpty())
  .isInt()
  .withMessage("Amount type must be an integer"),
  body('account_id')
  .if(body('account_id')
  .notEmpty())
  .isInt()
  .withMessage("Account ID must be an integer"),
  body('to_account_id')
  .if(body('to_account_id')
  .notEmpty())
  .isInt()
  .withMessage("To account ID must be an integer"),
  body('payment_method_id')
  .if(body('payment_method_id')
  .notEmpty())
  .isInt()
  .withMessage("Payment method ID must be an integer"),
  body('month_financed')
  .if(body('month_financed')
  .notEmpty())
  .isInt()
  .withMessage("Month financed ID must be an integer"),
  checkSchema(transactionValidation),
  async (req, res) => {
  const result = validationResult(req);
  const data = matchedData(req);
  if(!result.isEmpty())
    return res.status(400).send({ errors: result.array() });
  const results = await db.createTransaction(data);
  res.status(201).json({ id: results[0] });
});

router.patch('/:id',
  body('amount_type')
  .if(body('amount_type')
  .notEmpty())
  .isInt()
  .withMessage("Amount type must be an integer"),
  body('account_id')
  .if(body('account_id')
  .notEmpty())
  .isInt()
  .withMessage("Account ID must be an integer"),
  body('to_account_id')
  .if(body('to_account_id')
  .notEmpty())
  .isInt()
  .withMessage("To account ID must be an integer"),
  body('payment_method_id')
  .if(body('payment_method_id')
  .notEmpty())
  .isInt()
  .withMessage("Payment method ID must be an integer"),
  body('month_financed')
  .if(body('month_financed')
  .notEmpty())
  .isInt()
  .withMessage("Month financed ID must be an integer"),
  body('completed')
  .if(body('completed')
  .notEmpty())
  .isInt()
  .withMessage("Completed must be an integer"),
  checkSchema(idValidation),
  checkSchema(transactionValidation),
  async (req, res) => {
  const result = validationResult(req);
  const data = matchedData(req);
  if(!result.isEmpty())
    return res.status(400).send({ errors: result.array() });
  await db.updateTransaction(data.id, data);
  res.status(200).json({ success: true })
});

router.delete('/:id', checkSchema(idValidation), async (req, res) => {
  const result = validationResult(req);
  const data = matchedData(req);
  if(!result.isEmpty())
    return res.status(400).send({ errors: result.array() });
  await db.deleteTransaction(data.id);
  res.status(200).json({ success: true })
});

export default router;