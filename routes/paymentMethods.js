import { Router } from 'express';
import { check, checkSchema, matchedData, validationResult } from 'express-validator';
import * as db from '../db/paymentMethods.js';
import { idValidation, paymentMethodsValidation } from './utils/validationSchemas.js';

const router = Router();

router.get('/', async (req, res) => {
  const paymentMethods = await db.getPaymentMethods();
  res.status(200).json({ paymentMethods })
});

router.get('/:id', checkSchema(idValidation), async (req, res) => {
  const result = validationResult(req);
  const data = matchedData(req);
  if(!result.isEmpty())
    return res.status(400).send({ errors: result.array() });
  const paymentMethod = await db.getPaymentMethod(data.id);
  res.status(200).json({ paymentMethod });
});

router.post('/', checkSchema(paymentMethodsValidation), async (req, res) => {
  const result = validationResult(req);
  const data = matchedData(req);
  if(!result.isEmpty())
    return res.status(400).send({ errors: result.array() });
  const results = await db.createPaymentMethod(data);
  res.status(201).json({ id: results[0] });
});

router.patch('/:id', checkSchema(idValidation), checkSchema(paymentMethodsValidation), async (req, res) => {
  const result = validationResult(req);
  const data = matchedData(req);
  if(!result.isEmpty())
    return res.status(400).send({ errors: result.array() });
  await db.updatePaymentMethod(data.id, data);
  res.status(200).json({ success: true })
});

router.delete('/:id', checkSchema(idValidation), async (req, res) => {
  const result = validationResult(req);
  const data = matchedData(req);
  if(!result.isEmpty())
    return res.status(400).send({ errors: result.array() });
  await db.deletePaymentMethod(data.id);
  res.status(200).json({ success: true })
});

export default router;