# Node Guestbook API



This is an example guestbook API using node.js and sqlite3.

[Install Node from here](https://nodejs.org/en/)

Once node is installed then you can run the download the dependant packages using the command: `npm install` from within the directory.

To start the server use the command: `node start`

The SQLite database is a memory table, this means that your changes wont be saved to disk and will not persist between stop and starts.

To add a message to the guestbook use the address:

```
http://localhost:3000/addMessage?message=Hello World
```

Example Response:

```javascript
{"code":1,"info":"A row has been inserted with rowid 2"}
```

 To get a list of messages use the address:

```
http://localhost:3000/messages
```

Example response:

```javascript
{"code":1,"data":[{"message":"World","created":"2019-02-16 17:27:07"},{"message":"Hello","created":"2019-02-16 18:10:45"}]}
```

The struct response for messages in Swift is:

```swift
struct GuestBook: Codable {
    let code: Int
    let data: [GuestBookMessage]?
    let info: String?
    
    struct GuestBookMessage: Codable {
        let message: String
        let created: String
    }
}
```

