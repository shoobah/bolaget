var _ = require('lodash');
var elastic = require('elasticsearch');

var client = new elastic.Client({
    host: 'localhost:9200',
    log: 'trace'
})

var butiker = require('./data/butiker.json')

var n=0;
_.forEach(butiker.ButikerOmbud.ButikOmbud, function(butik){
    client.create({
        index: 'bolaget',
        type: 'butik',
        id: butik.Nr,
        body: butik
    })
})

/*
{
    "$": {
        "xsi:type": "StoreAssortmentViewModel"
    },
    "Address1": "Karlaplan 13",
    "Address2": "",
    "Address3": "S-115 20",
    "Address4": "STOCKHOLM",
    "Address5": "Stockholms l\u00e4n",
    "ButiksTyp": "",
    "Namn": "F\u00e4lt\u00f6versten",
    "Nr": "0102",
    "Oppettider": "2015-05-25;10:00;19:00;;;0;_*2015-05-26;10:00;19:00;;;0;_*2015-05-27;10:00;19:00;;;0;_*2015-05-28;10:00;19:00;;;0;_*2015-05-29;10:00;19:00;;;0;_*2015-05-30;10:00;15:00;;;0;_*2015-05-31;00:00;00:00;;;-;_*2015-06-01;10:00;19:00;;;0;_*2015-06-02;10:00;19:00;;;0;_*2015-06-03;10:00;19:00;;;0;_*2015-06-04;10:00;19:00;;;0;_*2015-06-05;10:00;19:00;;;0;_*2015-06-06;00:00;00:00;;;Nationaldagen;_*2015-06-07;00:00;00:00;;;-;_*2015-06-08;10:00;19:00;;;0;_*2015-06-09;10:00;19:00;;;0;",
    "RT90x": "6582011",
    "RT90y": "1630064",
    "SokOrd": "STOCKHOLM;STHLM;\u00d6STERMALM;KARLAPLANSRONDELLEN;F\u00c4LTAN",
    "Telefon": "08/662 22 89",
    "Tjanster": "",
    "Typ": "Butik"
}
*/