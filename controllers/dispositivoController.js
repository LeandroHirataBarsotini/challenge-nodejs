/*
 *
 * Arquivo: controllers/dispositivoController.js
 * Author: Leandro Hirata Barsotini
 * Description: Arquivo com as rotas: GET, PUT, DELETE e POST
 * Data: 16/05/2018
 * 
 */

const mongoose = require('mongoose');
const DispositivoModel = require('../models/dispositivoModel');
const querys = require('../persistence/dispositivoQuery');
const negocio = require('../business/dispositivoBusiness');
const logger = require('../services/logger');

function getDispositivoByUsuario(req, res) {
    
    var usuario = req.params.usuario;

    DispositivoModel.find( { usuarioId: usuario}, function (error, dispositivos) {
        if (error) {
            logger.error(error);
            res.send(error);
        }
        res.json(dispositivos);
    });
    
}

function addDispositivo(req, res) {

    DispositivoModel.aggregate(querys.getQueryAggregate(req.body.usuarioId), 

        function(error, result) {
            
            if(error) {
                logger.error(error);
            } else if(result 
                        && negocio.isInclusaoPermitida(result)) { // valida se pode incluir

                req.body.dataInclusao = new Date();
                var newDispositivo = new DispositivoModel(req.body);
                
                newDispositivo.save(function (error, dispositivo) {
                    if (error) {
                        logger.error(error);
                        res.send(error);
                    } else {
                        res.json(negocio.getJSonSucessoInclusao());
                    }
                });             
            } else {
                res.json(negocio.getJSonErroInclusao(result));
            }
            
        }
    );
    
}

function updateDispositivo(req, res) {

    var dispositivoId = req.body["_id"];

    DispositivoModel.findById({ _id: dispositivoId}, function (error, dispositivo) {
        
        if (error) {
            logger.error(error);
            res.send(error);
        } else if(dispositivo) {
            Object.assign(dispositivo, req.body).save(function (error, dispositivo) {
                if (error){
                    logger.error(error);
                    res.send(error);
                }

                res.json(negocio.getJSonSucessoAtualizacao());

            });
        } else {
            res.json(negocio.getJSonNaoLocalizadoAtualizacao());
        }
    });
}

function deleteDispositivo(req, res) {

    var usuarioId = req.body["usuarioId"];

    DispositivoModel.aggregate(querys.getQueryAggregate(usuarioId), 

        function(error, result) {
            
            if(error) {
                logger.error(error);
            } else if(result 
                && negocio.isInclusaoPermitida(result)) { // valida se pode excluir

                var dispositivoId = req.body["dispositivoId"];

                DispositivoModel.remove({ _id: dispositivoId }, function (error, result) {
                    if(error) {
                        logger.error(error);
                        res.send(error);
                    }
                    
                    res.json(negocio.getJSonSucessoExclusao());
                });

            } else {
                res.json(negocio.getJSonErroExclusao(result));
            }
            
        }
    );
    
}

module.exports = { 
    getDispositivoByUsuario, 
    addDispositivo, 
    updateDispositivo, 
    deleteDispositivo
};
