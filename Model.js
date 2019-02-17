const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');

  db.run(
          `CREATE TABLE guestbook (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            message TEXT,
            created TIMESTAMP
          )`
        );
});

exports.shutdown = function()
{
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
    process.exit(0);
  });
};

exports.getMessages = function()
{
  let sql = `SELECT message, created FROM guestbook order by created`;
 
  return new Promise( (resolve, reject) => {
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject({code : -1, info : `Error has occured ${err.message}`});
        return;
      }
      
      resolve({code: 1, data : rows});
    });
  });

};

exports.addMessage = function(message)
{
  let sql = `INSERT INTO guestbook(message, created) VALUES(?,CURRENT_TIMESTAMP)`;

  return new Promise( (resolve, reject) => {
    db.run(sql, [message], function(err) {
      if (err) {
        reject({code : -1, info : `Error has occured ${err.message}`});
        return;
      }
      // get the last insert id
      resolve({code : 1, info : `A message has been inserted with rowid ${this.lastID}`});
    });
  });
};