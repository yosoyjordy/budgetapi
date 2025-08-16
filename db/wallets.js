import knex from "./knex.js";

export function getActiveWallet() {
  return knex("wallets").select("*").where("active", 1);
}

export function getWallet(id) {
  return knex("wallets").select("*").where("id", id);
}

export function createWallet(wallet) {
  return knex("wallets").insert(wallet);
}

export function updateWallet(id, wallet) {
  return knex("wallets").where("id", id).update(wallet);
}

export function desactivateWallet(id) {
  return knex("wallets").where("id", id).update({ active: 0 });
}
