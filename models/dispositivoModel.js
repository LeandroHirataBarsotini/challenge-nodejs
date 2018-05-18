/**
 * 
 * Arquivo: models/dispositivoModel.js
 * Author: Leandro Hirata Barsotini
 * Description: Arquivo responsável pelo modelo: 'Dispositivo' para realizar a conexão com o mongodb
 * Data: 16/05/2018
 * 
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DispositivoSchema = new Schema({
    usuarioId: { type: Number, required: true },
    dataInclusao: { type: Date, required: true },
    dispositivoNome: { type: String, required: true },
    dispositivoModelo: { type: String, required: true },
}, {
    versionKey: false
});

module.exports = mongoose.model('dispositivo', DispositivoSchema);

