var _ = require('lodash');
var elastic = require('elasticsearch');

var client = new elastic.Client({
    host: 'localhost:9200',
    log: 'error'
})

var ba =  require('./data/butik-artikel.json');

_.forEach(ba.ButikArtikel.Butik, function(item){
    var thing ={
        index: 'bolaget',
        type: 'butik-artikel',
        id: item.$.ButikNr,
        body: item
    };
    client.create(thing);
})
