const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
 const passport = require("passport");
const bp = require("body-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
 app.use(passport.initialize());
app.use(bp.json());

require("./middlewares/passport")(passport);






const uri = process.env.ATLAS_URI || 'mongodb://localhost:27017/node-auth';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// User Router Middleware
app.use("/api/users", require("./routes/users"));
app.use(require("./routes/googleuser"));
app.use(require("./routes/facebookuser"));
app.use(require("./routes/posts"));
app.use(require("./routes/comments"));
app.use(require("./routes/reletedposts"));
app.use(require("./routes/menus"));
app.use(require("./routes/questions"));
app.use(require("./routes/courses"));
app.use(require("./routes/teachers"));

// app.route("/").get((req, res) => {
//   res.send(
//     "Hello World, All free course and college projects available at BesidesCollege.org"
//   );
// });

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client','build','index.html'))
})
}

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
