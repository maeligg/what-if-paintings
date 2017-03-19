var PouchDB = require('pouchdb');

var db = new PouchDB('dbname');

function getLastRan(){
  var existingDocumentRev,
      lastRanTime;

  db.get('last_ran').then(function(document) {
    existingDocumentRev = document['_rev'];
    lastRanTime = document['time'];
  }).catch(function (err) {
    console.log("No last_ran document")
  }).then(function(response){
    var now = Date.now(),
        lastRanDocument = {
          _id: 'state',
          time: now
        }
    if (existingDocumentRev){
      lastRanDocument['_rev'] = existingDocumentRev;
    }

    return db.put(lastRanDocument);
  }).catch(function (err) {
    console.log("Failed to update last_ran document");
  }).then(function(){
    return lastRanTime || 0;
  });
}

module.exports.getLast = getLastRan;

