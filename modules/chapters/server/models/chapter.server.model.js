'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Chapter Schema
 */
var ChapterSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    default: '',
    trim: true,
    required: 'Chapter name cannot be blank'
  },
  executiveLeader: {
    type: String,
    default: '',
    trim: true
  }
});

mongoose.model('Chapter', ChapterSchema);
