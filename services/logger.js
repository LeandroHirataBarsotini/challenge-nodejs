/*
 *
 * Arquivo: controllers/dispositivoController.js
 * Author: Leandro Hirata Barsotini
 * Description: Implementação de níveis de log
 * Data: 18/05/2018
 * 
 */

// serviço de log
const Log = require('log');
const log = new Log('info');

function info(mensagem) {
    log.info(mensagem);
}

function debug(mensagem) {
    log.debug(mensagem);
}

function error(mensagem) {
    log.error(mensagem);
}

module.exports = { 
    info, 
    debug, 
    error
};
