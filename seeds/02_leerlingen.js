/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const {tables} = require("../data");
// Cailliau Marie
// De Buyser Beau
// Desimpel Esthé
// Desmedt Yaro
// Deswaef Hanne
// Devolder Romy
// Durie Ester
// François Tijs
// Gerardis Daan
// Huysman Lucas
// Lammertyn Juul
// Lannoo Lobke
// Reynaert Carys
// Trancez Sem
// Vanacker Silke
// Vancauwenberghe Merel
// Vandecandelaere Margaux
// Vergote Loïc
// Verzeele Liam

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex(tables.leerling).truncate()
  await knex(tables.leerling).insert([
    {naam: 'Cailliau', voornaam: 'Marie', klas_id: 1},
    {naam: 'De Buyser', voornaam: 'Beau', klas_id: 1},
    {naam: 'Desimpel', voornaam: 'Esthé', klas_id: 1},
    {naam: 'Desmedt', voornaam: 'Yaro', klas_id: 1},
    {naam: 'Deswaef', voornaam: 'Hanne', klas_id: 1},
    {naam: 'Devolder', voornaam: 'Romy', klas_id: 1},
    {naam: 'Durie', voornaam: 'Ester', klas_id: 1},
    {naam: 'François', voornaam: 'Tijs', klas_id: 1},
    {naam: 'Gerardis', voornaam: 'Daan', klas_id: 1},
    {naam: 'Huysman', voornaam: 'Lucas', klas_id: 1},
    {naam: 'Lammertyn', voornaam: 'Juul', klas_id: 1},
    {naam: 'Lannoo', voornaam: 'Lobke', klas_id: 1},
    {naam: 'Reynaert', voornaam: 'Carys', klas_id: 1},
    {naam: 'Trancez', voornaam: 'Sem', klas_id: 1},
    {naam: 'Vanacker', voornaam: 'Silke', klas_id: 1},
    {naam: 'Vancauwenberghe', voornaam: 'Merel', klas_id: 1},
    {naam: 'Vandecandelaere', voornaam: 'Margaux', klas_id: 1},
    {naam: 'Vergote', voornaam: 'Loïc', klas_id: 1},
    {naam: 'Verzeele', voornaam: 'Liam', klas_id: 1},

    {naam: 'Verhulst', voornaam: 'Bram', klas_id: 3},
    {naam: 'Hoste', voornaam: 'Pierre', klas_id: 3},
    {naam: 'Vanleirsberge', voornaam: 'Tano', klas_id: 3},

    {naam: 'Provoost', voornaam: 'Isaura', klas_id: 4},
    {naam: 'Van de Velde', voornaam: 'Louie', klas_id: 4},
  ]);
};

