var PouchDB = require('pouchdb');

var db = new PouchDB('dbname');

var existingDocumentRev;

db.get('last_ran').then(function(document) {
  existingDocumentRev = document['_rev'];
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
});

