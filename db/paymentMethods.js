import knex from './knex.js';

export function createPaymentMethod(paymentMethod) {
    return knex('payment_methods').insert(paymentMethod);
};

export function getPaymentMethods() {
    return knex('payment_methods').select('*');
}

export function getPaymentMethod(id) {
    return knex('payment_methods').select('*').where('id', id);
}

export function updatePaymentMethod(id, paymentMethod) {
    return knex('payment_methods').where('id', id).update(paymentMethod);
}

export function deletePaymentMethod(id) {
    return knex('payment_methods').where('id', id).del();
}