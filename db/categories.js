import knex from './knex.js';

export function createCategory(category) {
    return knex('categories').insert(category);
};

export function getCategories() {
    return knex('categories').select('id', 'category', knex.raw('COALESCE(budget, 0) as budget')).orderBy('category', "asc");
}

export function getCategory(id) {
    return knex('categories').select('*').where('id', id);
}

export function updateCategory(id, category) {
    return knex('categories').where('id', id).update(category);
}

export function deleteCategory(id) {
    return knex('categories').where('id', id).del();
}