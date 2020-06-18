const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());

mongoose.connect(
  "mongodb+srv://<username>:<password>@graphql-u5vp0.mongodb.net/GraphQL?retryWrites=true&w=majority"
);
mongoose.connection.once("open", () => {
  console.log("connected to database");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema, // schema: schema
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("now listenting for request on port 4000");
});
