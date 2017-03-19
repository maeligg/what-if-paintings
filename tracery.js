var tracery = require('tracery-grammar'),
    rawGrammar = require('./grammar.json'), // the grammar for the bot, edit this!
    processedGrammar = tracery.createGrammar(rawGrammar);

processedGrammar.addModifiers(tracery.baseEngModifiers); 

module.exports.grammar = processedGrammar;

module.exports.generateTweet = function (){
  return processedGrammar.flatten("#origin#"); // make sure an "origin" entry is in your grammar.json file
}