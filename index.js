var express = require('express');
var app = express();


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

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

function shutDown()
{
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
    process.exit(0);
  });
}

app.get('/messages', function (req, res) {
  let sql = `SELECT message, created FROM guestbook order by created`;
 
    db.all(sql, [], (err, rows) => {
      if (err) {
        res.json({code : -1, info : `Error has occured ${err.message}`});
        return console.log(err.message);
      }
      
      res.json({code: 1, data : rows});
    });
});

app.get('/addMessage', function (req, res) {

  const message = req.query.message;

  if( message == undefined || message.length == 0 )
  {
    res.json({code : -1, info : "Message not supplied"});
    return;
  }

  db.run(`INSERT INTO guestbook(message, created) VALUES(?,CURRENT_TIMESTAMP)`, [message], function(err) {
    if (err) {
      res.json({code : -1, info : `Error has occured ${err.message}`});
      return console.log(err.message);
    }
    // get the last insert id
    res.json({code : 1, info : `A row has been inserted with rowid ${this.lastID}`});
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
