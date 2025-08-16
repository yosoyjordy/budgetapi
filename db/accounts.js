import knex from './knex.js';

export function getAccounts() {
    return knex('accounts').select('*');
}

export function getAccount(id) {
    return knex('accounts').select('*').where('id', id);
}

export function createAccount(account) {
    return knex('accounts').insert(account);
};

export function updateAccount(id, account) {
    return knex('accounts').where('id', id).update(account);
}

export function deleteAccount(id) {
    return knex('accounts').where('id', id).del();
}
