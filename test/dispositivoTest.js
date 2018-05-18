/*
 *
 * Arquivo: test/dispositivoTest.js
 * Author: Leandro Hirata Barsotini
 * Description: Arquivo com os testes
 * Data: 16/05/2018
 * 
 */

process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');

const chai = require('chai');
const chaiHttp = require('chai-http');
const dateFormat = require('dateformat');

const server = require('../index');
const DispositivoModel = require('../models/dispositivoModel');
const factory = require('../persistence/connectionFactory');
const inserts = require('../persistence/initDatabase');
const negocio = require('../business/dispositivoBusiness');

const should = chai.should();

chai.use(chaiHttp);

const db = factory.createDBConnection();

var lista;

// inicio do teste
describe('DispositivoModel', function () {

    
    beforeEach(function (done) {
        
        // limpar a base
        DispositivoModel.remove({}, function (error, docs) {

            // popular a base
            DispositivoModel.insertMany(inserts.getArrayInsert(), function(error, docs) {
                done();
            });
            
        });
        
    });
    
    // teste do get
    describe('/GET geral', function () {
        it('Verifica se a API iniciou com sucesso', function (done) {
            chai.request(server)
                .get('/')
                .end(function (error, res) {

                    // status: 200 - OK
                    res.should.have.status(200);

                    res.body.should.be.a('object');

                    done();
                });
        });
    });

    // teste do get por usuario
    describe('/GET:usuario dispositivos', function () {
        it('Listar todos os dispositivos do usuário 789', function (done) {
            chai.request(server)
                .get('/dispositivo/789')
                .end(function (error, res) {

                    lista = res.body;
                    // status: 200 - OK
                    res.should.have.status(200);

                    // retorno tem que ser o array com os dispositivos:
                    res.body.should.be.a('array');

                    done();

                });
        });
    });
    
    describe('/POST usuario 123', function () {
        it('Teste de um usuário novo. Deve ser feito com sucesso', function (done) {

            var dispositivo = {
                "usuarioId": 123,
                "dispositivoNome": "Galaxy 1",
                "dispositivoModelo": "android"
            }

            chai.request(server)
                .post('/dispositivo')
                .send(dispositivo)
                .end(function (error, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status');
                    res.body.should.have.property('status').eql(1);
                    res.body.should.have.property('descricao');
                    res.body.should.have.property('descricao').eql('Inclusão feita com sucesso');
                    done();
                });
        });
    });
    
    describe('/POST usuario 123', function () {
        it('Usuário com 1 dispositivo. Deve ser feito com sucesso', function (done) {

            var dispositivo = {
                "usuarioId": 123,
                "dispositivoNome": "Galaxy 2",
                "dispositivoModelo": "android"
            }

            chai.request(server)
                .post('/dispositivo')
                .send(dispositivo)
                .end(function (error, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status');
                    res.body.should.have.property('status').eql(1);
                    res.body.should.have.property('descricao');
                    res.body.should.have.property('descricao').eql('Inclusão feita com sucesso');
                    done();
                });
            
        });
    });

    describe('/POST usuario 456', function () {
        it('Teste de um usuário que já possui 3 dispositivos. Não deve permitir o casdastro e deve sugirir a troca', function (done) {

            var dispositivo = {
                "usuarioId": 456,
                "dispositivoNome": "Hello Moto",
                "dispositivoModelo": "android"
            }

            chai.request(server)
                .post('/dispositivo')
                .send(dispositivo)
                .end(function (error, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status');
                    res.body.should.have.property('status').eql(0);
                    res.body.should.have.property('descricao');
                    res.body.should.have.property('descricao').eql('Cliente excedeu o número de dispositivos. Mas pode efetuar uma troca de dispositivo');
                    done();
                });
        });
    });

    describe('/POST usuario 654', function () {
        it('Usuário com 3 dispositivos sem direito de troca. Deve retornar erro', function (done) {

            var dispositivo = {
                "usuarioId": 654,
                "dispositivoNome": "Galaxy 4",
                "dispositivoModelo": "android"
            }

            proximaData = new Date();
            proximaData.setDate(proximaData.getDate() + 15);
            
            var mensagemErro = 'Cliente excedeu o número de dispositivos. Próxima troca estará disponível em ' + dateFormat(proximaData, "dd/mm/yyyy");

            chai.request(server)
                .post('/dispositivo')
                .send(dispositivo)
                .end(function (error, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status');
                    res.body.should.have.property('status').eql(0);
                    res.body.should.have.property('descricao');
                    res.body.should.have.property('descricao').eql(mensagemErro);
                    done();
                });
        });
    });

    describe('/DELETE usuário 789 ', function () {

        it('O usuário possui 2 dispositivos. Deve excluir ', function (done) {

            var dispositivo = {
                "usuarioId": 789,
                "dispositivoId": lista[1]._id
            }
            
            chai.request(server)
                .delete('/dispositivo')
                .send(dispositivo)
                .end(function (error, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status');
                    res.body.should.have.property('status').eql(1);
                    res.body.should.have.property('descricao');
                    res.body.should.have.property('descricao').eql('Exclusão feita com sucesso');
                    done();
                });
            
        });
    });

    describe('/PUT usuário 789 ', function () {

        it('Tenta atualizar um dispositivo não existente ', function (done) {

            var dispositivo = {
                "_id": "5afddebaaea50f369f54805d",
                "dispositivoNome": "teste"
            }

            chai.request(server)
                .put('/dispositivo')
                .send(dispositivo)
                .end(function (error, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status');
                    res.body.should.have.property('status').eql(0);
                    res.body.should.have.property('descricao');
                    res.body.should.have.property('descricao').eql('Dispositivo não localizado');
                    done();
                });
            
        });
    });

});