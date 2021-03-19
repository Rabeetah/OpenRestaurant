const express = require("./app.js"),
mongoose = require("mongoose");
var config = require('config');
var http = require('http');
// cron = require("node-cron");

// Use env port or default
// const port = process.env.PORT || 5000;

//establish socket.io connection
const app = express.init();
const server = http.createServer(app);
const io = require("socket.io")(server);
// server.listen(4000);

io.of("http://localhost:4000/api/socket").on("connection", (socket) => {
  console.log("socket.io: User connected: ", socket.id);

  socket.on("disconnect", () => {
    console.log("socket.io: User disconnected: ", socket.id);
  });
});

//start the server
server.listen(port, () => console.log(`Server now running on port ${port}!`));

const dB = config.get('mongoURI');

const connection = mongoose.connect(dB, { useNewUrlParser: true, useUnifiedTopology: true });
var app = express();
connection.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });

//connect to db
// mongoose.connect(process.env.DB_URI || require("./config/config").db.uri, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
// });

// const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connected");

  console.log("Setting change streams");
  const thoughtChangeStream = connection.collection("orders").watch();

  thoughtChangeStream.on("change", (change) => {
    switch (change.operationType) {
      case "insert":
        const order = {
          _id: change.fullDocument._id,
          ordered_food: change.fullDocument.ordered_food,
          ordertime: change.fullDocument.ordertime,
          status: change.fullDocument.ordered_food,
          order_id: change.fullDocument.ordertime,
          customer_id: change.fullDocument.customer_id,
          total_bill: change.fullDocument.total_bill,
        };

        io.of("http://localhost:4000/api/socket").emit("newOrder", order);
        break;

    //   case "delete":
    //     io.of("/api/socket").emit("deletedThought", change.documentKey._id);
    //     break;
    }
  });
});

//schedule deletion of thoughts at midnight
// cron.schedule("0 0 0 * * *", async () => {
//   await connection.collection("thoughts").drop();

//   io.of("/api/socket").emit("thoughtsCleared");
// });

connection.on("error", (error) => console.log("Error: " + error));