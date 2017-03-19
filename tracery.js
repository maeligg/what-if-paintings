var tracery = require('tracery-grammar');

var rawGrammar = require('./grammar.json');

var processedGrammar = tracery.createGrammar(rawGrammar);

processedGrammar.addModifiers(tracery.baseEngModifiers); 

module.exports.generateTweet = function (){
  return processedGrammar.flatten("#origin#");
}