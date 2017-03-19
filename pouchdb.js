var PouchDB = require('pouchdb');

var db = new PouchDB('dbname');

db.get('mydoc').then(function(doc) {
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
    return db.put({
      _id: 'mydoc',
      title: "Let's Dance"
    });
  }
});
