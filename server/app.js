const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const adminUser = 'admin';
const adminPassword = 'admin';
mongoose.connect(
  `mongodb+srv://${adminUser}:${adminPassword}@react-gql.fkg1qin.mongodb.net/?retryWrites=true&w=majority`
);
mongoose.connection.once('open', () => {
  console.log('connected to db');
});
app.use(cors());
app.use('/graphql', graphqlHTTP({ schema }));

app.listen(4000, () => {
  console.log('now listening for requests on port 4000');
});
