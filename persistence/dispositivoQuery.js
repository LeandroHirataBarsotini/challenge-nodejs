/**
 * 
 * Arquivo: persistence/dispositivoQuery.js
 * Author: Leandro Hirata Barsotini
 * Description: query para fazer a agregração no mongo
 * Data: 16/05/2018
 * 
 */

// funcao para criar a agregação
function getQueryAggregate(usuario) {
    return [
        {
                $match: {
                    usuarioId: parseInt(usuario)
                }
        }, 
        { 
                $group: { 
                        _id: "$usuarioId", 
                        totalDispositivos: { $sum: 1 }, 
                        dataUltimaAlteracao: {$max: "$dataInclusao"} 
                } 
        }
    ];
}

module.exports = { getQueryAggregate };