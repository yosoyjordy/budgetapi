import { Router } from 'express';
import accountsRouter from './accounts.js';
import categoriesRouter from './categories.js';
import paymentMethodsRouter from './paymentMethods.js';
import walletsRouter from './wallets.js';
import transactionsRouter from './transactions.js';

const router = Router();
router.use('/api/accounts', accountsRouter);
router.use('/api/categories', categoriesRouter);
router.use('/api/paymentMethods', paymentMethodsRouter);
router.use('/api/wallets', walletsRouter);
router.use('/api/transactions', transactionsRouter);

export default router;