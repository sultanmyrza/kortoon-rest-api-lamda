'use strict';
require('dotenv').config({ path: './variables.env' });
const connectToDatabase = require('./db');
const Kortoon = require('./models/Kortoon');

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    Kortoon.create(JSON.parse(event.body))
      .then(kortoon =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(kortoon)
        })
      )
      .catch(err =>
        callback(null, {
          response: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify(err)
        })
      );
  });
};

module.exports.getOne = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    const kortoonId = event.pathParameters.id;
    Kortoon.findById(kortoonId)
      .then(kortoon =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(kortoon)
        })
      )
      .catch(err =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'plain/text' },
          body: JSON.stringify(err)
        })
      );
  });
};

module.exports.getAll = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    Kortoon.find()
      .then(kortoons => {
        console.log(kortoons);
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(kortoons)
        });
      })
      .catch(err =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'plain/text' },
          body: JSON.stringify(err.message)
        })
      );
  });
};

module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const kortoonId = event.pathParameters.id;
  const newKortoon = JSON.parse(event.body);
  connectToDatabase().then(() => {
    Kortoon.findByIdAndUpdate(kortoonId, newKortoon, { new: true })
      .then(updatedKortoon =>
        callback(null, {
          response: 200,
          body: JSON.stringify(updatedKortoon)
        })
      )
      .catch(err =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'plain/text' },
          body: JSON.stringify(err.message)
        })
      );
  });
};

module.exports.delete = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    const kortoonId = event.pathParameters.id;
    Kortoon.findByIdAndRemove(kortoonId)
      .then(deletedKortoon =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({
            message: `remove kortoon with id ${kortoonId}`,
            kortoon: deletedKortoon
          })
        })
      )
      .catch(err =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify(err)
        })
      );
  });
};
