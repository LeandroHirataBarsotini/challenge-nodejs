/*
 *
 * Arquivo: business/dispositivoBusiness.js
 * Author: Leandro Hirata Barsotini
 * Description: Arquivo com as regras de negócio
 * Data: 17/05/2018
 * 
 */

const dateFormat = require('dateformat');

const qtdeDiaParaTroca = 30;

function calcularDataParaAlteracao(dataInclusao) {

    novaData = new Date(dataInclusao);
    novaData.setDate(dataInclusao.getDate() + qtdeDiaParaTroca);

    return novaData

}

function formatarData(data) {

    return dateFormat(data, "dd/mm/yyyy");

}

function isInclusaoPermitida(controleDispositivo) {

    if(controleDispositivo && controleDispositivo.length > 0) {
        // permite incluir, quando o clinente possuir menos de 3 dispositivos
        return (controleDispositivo[0].totalDispositivos < 3);
    }

    // permite inclusao quando não houver dispositivo cadastrado
    return true;

}

function isExclusaoPermitida(controleDispositivo) {

    if(controleDispositivo && controleDispositivo.length > 0) {
        
        if(controleDispositivo[0].totalDispositivos == 1) {
            // so permite excluir, quando o cliente tiver mas de 1 dispositivo
            return false;
        } else if(controleDispositivo[0].totalDispositivos == 2) {
            // permite excluir quando só houver 2 dispositivos cadastrados
            return true;
        } else {
            // quando houver mais de 2 dispositivos, o cliente deve efetuar uma troca (exclusão e inclusão)
            // o cliente so pode trocar o dispositivo depois de 30 dias da ultima alteração
            dataLimite = calcularDataParaAlteracao(controleDispositivo[0].dataUltimaAlteracao)
            return (dataLimite < new Date());
        }
    }

    return false;

}

function getJSonSucessoInclusao() {

    return {
                status: 1,
                descricao: 'Inclusão feita com sucesso',
            };

}

function getJSonErroInclusao(controleDispositivo) {

    var mensagemErro;
    dataLimite = calcularDataParaAlteracao(controleDispositivo[0].dataUltimaAlteracao)

    if(dataLimite > new Date()) {
        mensagemErro = 'Cliente excedeu o número de dispositivos. Próxima troca estará disponível em ' + formatarData(dataLimite);
    } else {
        mensagemErro = 'Cliente excedeu o número de dispositivos. Mas pode efetuar uma troca de dispositivo';
    }

    return {
        status: 0,
        descricao: mensagemErro
    };

}

function getJSonSucessoAtualizacao() {

    return {
                status: 1,
                descricao: 'Atualização feita com sucesso',
            };

}

function getJSonNaoLocalizadoAtualizacao() {

    return {
                status: 0,
                descricao: 'Dispositivo não localizado',
            };

}

function getJSonSucessoExclusao() {

    return {
        status: 1,
        descricao: 'Exclusão feita com sucesso'
    };

}

function getJSonErroExclusao(controleDispositivo) {

    var mensagemErro;

    if(controleDispositivo[0].totalDispositivos == 1) {
        mensagemErro = 'Não é permitida exclusão quando só existir um cadastrado';
    } else {
        dataLimite = calcularDataParaAlteracao(controleDispositivo[0].dataUltimaAlteracao)

        if(dataLimite > new Date()) {
            mensagemErro = 'Cliente já fez uma troca no últimos ' + qtdeDiaParaTroca + ' dias . Próxima troca estará disponível em ' + formatarData(dataLimite);
        } 
    }
    return {
        status: 0,
        descricao: mensagemErro
    };

}

module.exports = {
    calcularDataParaAlteracao,
    isInclusaoPermitida,
    isExclusaoPermitida,
    getJSonSucessoInclusao,
    getJSonErroInclusao,
    getJSonSucessoAtualizacao,
    getJSonNaoLocalizadoAtualizacao,
    getJSonSucessoExclusao,
    getJSonErroExclusao
}
