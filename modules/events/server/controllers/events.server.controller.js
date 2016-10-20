'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Event = mongoose.model('Event'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an event
 */
exports.create = function (req, res) {
  var event = new Event(req.body);
  event.name = 'Event Name';

  event.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(event);
    }
  });
};

/**
 * List of Events
 */
exports.list = function (req, res) {
  Event.find().sort('-created').populate('user', 'displayName').exec(function (err, events) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(events);
    }
  });
};

/**
 * Show the current event
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var event = req.event ? req.event.toJSON() : {};
  res.json(event);
};

/**
 * Event middleware
 */
exports.eventById = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Event is invalid'
    });
  }

  Event.findById(id).populate('user', 'displayName').exec(function (err, event) {
    if (err) {
      return next(err);
    } else if (!event) {
      return res.status(404).send({
        message: 'No event with that identifier has been found'
      });
    }
    req.event = event;
    next();
  });
};


exports.eventByName = function (req, res, next, name) {
  console.log('Finding event with name [' + name + ']');

  Event.findOne({ name: name }).populate('user', 'displayName').exec(function (err, event) {
    if (err) {
      return next(err);
    } else if (!event) {
      return res.status(404).send({
        message: 'No event with that name has been found'
      });
    }
    req.event = event;
    next();
  });
};
