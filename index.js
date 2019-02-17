let app = require('express')();
let Model = require('./Model');

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

function shutDown() {
  Model.shutdown();
}

app.get('/messages', function (req, res){
  Model
    .getMessages()
    .then( 
      data => res.json(data), 
      data => {
        console.log(data.info);
        res.json(data);
      });
});

app.get('/addMessage', function (req, res) {
  let message = req.query.message;

  if( message == undefined || message.length == 0 ) {
    res.json({code : -1, info : "Message not supplied"});
    return;
  }

  Model
    .addMessage(message)
    .then( 
      data => res.json(data), 
      data => {
        console.log(data.info);
        res.json(data);
      });
});

app.listen(3000, function () {
  console.log('Guestbook API listening on port 3000!');
});
