'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Event Schema
 */
var EventSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    default: '',
    trim: true,
    required: 'Event name cannot be blank'
  },
  eventDate: {
    type: Date,
    required: 'Event date cannot be blank'
  }
});

mongoose.model('Event', EventSchema);
