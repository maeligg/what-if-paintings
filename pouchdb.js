var PouchDB = require('pouchdb');

var db = new PouchDB('dbname');

db.get('last_time').then(function(doc) {
  console.log(doc);
  // return db.put({
  //   _id: 'mydoc',
  //   _rev: doc._rev,
  //   title: "Let's Dance"
  // });
}).then(function(response) {
  // handle response
  console.log("Response", response);
}).catch(function (err) {
  console.log("Error", err);
  if (err.status == 404){
    console.log("Not found");
  }
}).then(function(response){
  var latestTime = Date.now();
  console.log(latestTime);
  return db.put({
      _id: 'last_time',
      latestTimetime: latestTime
    });
}).catch(function (err) {
  if (err.name === 'conflict') {
    console.log("ERROR! CONFLICT!")
    // conflict!
  } else {
    console.log("OTHER ERROR")
    // some other error
  }
});

