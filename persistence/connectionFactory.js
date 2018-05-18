/*
 *
 * Arquivo: persistence/connectionFactory.js
 * Author: Leandro Hirata Barsotini
 * Description: Arquivo para fazer a conexão com o banco
 * Data: 16/05/2018
 * 
 */

const mongoose = require('mongoose');
const config = require('config');

mongoose.Promise = global.Promise;

function createDBConnection() {

    // cria a conexão com o banco
    mongoose.connect(config.DBHost);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Erro ao conectar com a Base de Dados....: '));

    return db;

}

module.exports =  { createDBConnection };
