/**
 * 
 * Arquivo: index.js
 * Author: Leandro Hirata Barsotini
 * Description: Responsável por executar a API.
 * Data: 16/05/2018
 * 
 */

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const config = require('config');

const dispositivoController = require('./controllers/dispositivoController');
const factory = require('./persistence/connectionFactory');
const logger = require('./services/logger');

const port = config.apiPort;

const db = factory.createDBConnection();

if (config.util.getEnv('NODE_ENV') !== 'Test') {
    app.use(morgan('combined'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

// Teste para verificar se a api está no ar

app.get("/", (req, res) => res.json({
    message: "A API está ativa"
}));

// Definição das rotas da API

app.route("/dispositivo/:usuario")
    .get(dispositivoController.getDispositivoByUsuario);

app.route("/dispositivo")
    .post(dispositivoController.addDispositivo)
    .put(dispositivoController.updateDispositivo)
    .delete(dispositivoController.deleteDispositivo);

app.listen(port);

logger.info("API operante na porta " + port);

module.exports = app;
