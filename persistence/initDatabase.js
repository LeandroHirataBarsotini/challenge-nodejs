/**
 * 
 * Arquivo: persistence/initDatabase.js
 * Author: Leandro Hirata Barsotini
 * Description: array para inicializar o banco antes dos testes
 * Data: 16/05/2018
 * 
 */

// funcao para criar a agregação
function getArrayInsert() {

    dataAteracaoRecente = new Date();
    dataAteracaoRecente.setDate(dataAteracaoRecente.getDate() - 15);

    return [
        { "usuarioId": 456, "dataInclusao": new Date("2017-11-21T01:10:00"), "dispositivoNome": "iPobre", "dispositivoModelo": "ios" },
        { "usuarioId": 456, "dataInclusao": new Date("2017-12-21T01:10:00"), "dispositivoNome": "iPad", "dispositivoModelo": "ios" },
        { "usuarioId": 456, "dataInclusao": new Date("2018-01-21T01:10:00"), "dispositivoNome": "TV", "dispositivoModelo": "android" },
        { "usuarioId": 654, "dataInclusao": new Date("2017-11-21T01:10:00"), "dispositivoNome": "iPobre", "dispositivoModelo": "ios" },
        { "usuarioId": 654, "dataInclusao": new Date("2017-12-21T01:10:00"), "dispositivoNome": "iPad", "dispositivoModelo": "ios" },
        { "usuarioId": 654, "dataInclusao": dataAteracaoRecente, "dispositivoNome": "TV", "dispositivoModelo": "android" },
        { "usuarioId": 789, "dataInclusao": new Date("2018-02-01T01:10:00"), "dispositivoNome": "iPobre", "dispositivoModelo": "ios" },
        { "usuarioId": 789, "dataInclusao": dataAteracaoRecente, "dispositivoNome": "iPad", "dispositivoModelo": "ios" },
    ];
}

module.exports = { getArrayInsert };