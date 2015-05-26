var xml2json = require('xml-to-json')

xml2json({
  input: './butiker.xml',
  output: './data/butiker.json'
}, function(err, result) {

  if (err) {
    console.error(err);
  }
});
xml2json({
  input: './butik-artikel.xml',
  output: './data/butik-artikel.json'
}, function(err, result) {

  if (err) {
    console.error(err);
  }
});
xml2json({
  input: './sortiment.xml',
  output: './data/sortiment.json'
}, function(err, result) {

  if (err) {
    console.error(err);
  }
});
