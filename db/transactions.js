import knex from './knex.js';

export function getTransactions(transactionTypeId) {
  const activeDate = knex('wallets').select('date').where('active', 1);

  const knexQry = knex
    .with(
      'allTransactions',
      knex.union([
        knex('transactions')
          .select(
            'transactions.id',
            'transaction_type_id',
            'date',
            'description',
            'amount',
            'category_id',
            'category',
            'amount_type',
            'account_id',
            'accounts.account as account',
            'to_account_id',
            'toAccounts.account as to_account',
            'payment_method_id',
            'payment_method',
            'month_financed'
          )
          .leftJoin(
            'payment_methods',
            'payment_methods.id',
            'transactions.payment_method_id'
          )
          .leftJoin('accounts', 'accounts.id', 'transactions.account_id')
          .leftJoin(
            'accounts as toAccounts',
            'toAccounts.id',
            'transactions.to_account_id'
          )
          .join('categories', 'categories.id', 'transactions.category_id')
          .where('transactions.date', '>=', activeDate)
          .whereNot('transaction_type_id', 3),
        knex('transactions')
          .select(
            'transactions.id',
            'transaction_type_id',
            'date',
            'description',
            'amount',
            'category_id',
            'category',
            'amount_type',
            'account_id',
            'accounts.account as account',
            'to_account_id',
            'toAccounts.account as to_account',
            'payment_method_id',
            'payment_method',
            'month_financed'
          )
          .leftJoin(
            'payment_methods',
            'payment_methods.id',
            'transactions.payment_method_id'
          )
          .leftJoin('accounts', 'accounts.id', 'transactions.account_id')
          .leftJoin(
            'accounts as toAccounts',
            'toAccounts.id',
            'transactions.to_account_id'
          )
          .join('categories', 'categories.id', 'transactions.category_id')
          .where('transaction_type_id', 3)
          .whereNull('completed')
      ])
    )
    .select('*')
    .from('allTransactions');

  if (transactionTypeId)
    knexQry.whereIn('allTransactions.transaction_type_id', transactionTypeId);
  
  knexQry.orderBy('allTransactions.id', 'desc');

  return knexQry;
}

export function createTransaction(transaction) {
  return knex('transactions').insert(transaction);
}

export function getTransaction(id) {
  return knex('transactions').select('*').where('id', id);
}

export function updateTransaction(id, transaction) {
  return knex('transactions').where('id', id).update(transaction);
}

export function deleteTransaction(id) {
  return knex('transactions').where('id', id).del();
}
