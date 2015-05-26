var _ = require('lodash');
var elastic = require('elasticsearch');

var client = new elastic.Client({
    host: 'localhost:9200',
    log: 'error'
})

var sortiment = require('./data/sortiment.json')

function setMapping(callback) {
    var mapping = {
        Alkoholhalt        : {
                    "type": "float",
                    "null_value": 0.0
                },
        Argang             : {
                    "type": "float",
                    "null_value": 0.0
                },
        Artikelid          : {
                    "type": "string"
                },
        Ekologisk          : {
                    "type": "boolean"
                },
        Forpackning        : {
                    "type": "string"
                },
        Forslutning        : {
                    "type": "string"
                },
        Koscher            : {
                    "type": "boolean"
                },
        Leverantor         : {
                    "type": "string"
                },
        Namn               : {
                    "type": "string"
                },
        Namn2              : {
                    "type": "string"
                },
        PrisPerLiter       : {
                    "type": "float",
                    "null_value": 0.0
                },
        Prisinklmoms       : {
                    "type": "float",
                    "null_value": 0.0
                },
        Producent          : {
                    "type": "string"
                },
        Provadargang       : {
                    "type": "string"
                },
        RavarorBeskrivning : {
                    "type": "string"
                },
        Saljstart          : {
                    "type": "date",
                    "format": "date",
                },
        Slutlev            : {
                    "type": "string"
                },
        Sortiment          : {
                    "type": "string"
                },
        Ursprung           : {
                    "type": "string"
                },
        Ursprunglandnamn   : {
                    "type": "string"
                },
        Varnummer          : {
                    "type": "long"
                },
        Varugrupp          : {
                    "type": "string"
                },
        Volymiml           : {
                    "type": "float",
                    "null_value": 0.0
                },
        nr                 : {
                    "type": "long"
                }
    };

    client.indices.putMapping({
        body: {"properties":
                mapping
              },
        index: "bolaget",
        type: "artikel"
    },function(error){
        if(!error){
            console.log('Mapping created');
            callback();
        }
    })

}

function insertValues() {
    var n = 0;
    _.forEach(sortiment.artiklar.artikel, function (artikel) {
    var item = {
        Alkoholhalt        : artikel.Alkoholhalt.replace(/%/ig, ''),
        Argang             : artikel.Argang,
        Artikelid          : artikel.Artikelid,
        Ekologisk          : artikel.Ekologisk,
        Forpackning        : artikel.Forpackning,
        Forslutning        : artikel.Forslutning,
        Koscher            : artikel.Koscher,
        Leverantor         : artikel.Leverantor,
        Namn               : artikel.Namn,
        Namn2              : artikel.Namn2,
        PrisPerLiter       : artikel.PrisPerLiter,
        Prisinklmoms       : artikel.Prisinklmoms,
        Producent          : artikel.Producent,
        Provadargang       : artikel.Provadargang,
        RavarorBeskrivning : artikel.RavarorBeskrivning,
        Saljstart          : artikel.Saljstart,
        Slutlev            : artikel.Slutlev,
        Sortiment          : artikel.Sortiment,
        Ursprung           : artikel.Ursprung,
        Ursprunglandnamn   : artikel.Ursprunglandnamn,
        Varnummer          : artikel.Varnummer,
        Varugrupp          : artikel.Varugrupp,
        Volymiml           : artikel.Volymiml,
        nr                 : artikel.nr
    }

    client.create({
        index: 'bolaget',
        type: 'artikel',
        id: artikel.nr,
        body: item
    })
    n += 1;
})
    console.log('Created %d articles', n);
}

client.indices.create('artikel', function () {
    setMapping(insertValues);
});



/*        "artikel": [
            {
                "Alkoholhalt": "37.50%",
                "Argang": "",
                "Artikelid": "1",
                "Ekologisk": "0",
                "Forpackning": "Flaska",
                "Forslutning": "",
                "Koscher": "0",
                "Leverantor": "Pernod Ricard Sweden AB",
                "Namn": "Renat",
                "Namn2": "",
                "PrisPerLiter": "292.86",
                "Prisinklmoms": "205.00",
                "Producent": "Pernod Ricard",
                "Provadargang": "",
                "RavarorBeskrivning": "F\u00f6rr potatis numera endast s\u00e4d.",
                "Saljstart": "1993-10-01",
                "Slutlev": "",
                "Sortiment": "FS",
                "Ursprung": "",
                "Ursprunglandnamn": "Internationellt m\u00e4rke",
                "Varnummer": "1",
                "Varugrupp": "Okryddad sprit",
                "Volymiml": "700.00",
                "nr": "101"
            },*/
