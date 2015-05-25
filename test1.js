var elastic = require('elasticsearch');

var client = new elastic.Client({
    host: 'localhost:9200',
    log: 'trace'
})



client.ping({
    requestTimeout: Infinity,
    hello: 'elasticsarch!'
}, function(error){
    if(error){
        console.trace('elasticsarch cluster is down!');
    } else {
        console.log('All is well');
        client.info();
    }
});

