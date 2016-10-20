'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Chapter = mongoose.model('Chapter'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a chapter
 */
exports.create = function (req, res) {
  var chapter = new Chapter(req.body);
  chapter.name = 'New England';
  chapter.executiveLeader = 'Scott Rehlander';

  chapter.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(chapter);
    }
  });
};

/**
 * List of Chapters
 */
exports.list = function (req, res) {
  Chapter.find().sort('-created').populate('user', 'displayName').exec(function (err, chapters) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(chapters);
    }
  });
};

/**
 * Show the current chapter
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var chapter = req.chapter ? req.chapter.toJSON() : {};
  res.json(chapter);
};

exports.chapterByName = function (req, res, next, name) {
  console.log('Finding chapter with name [' + name + ']');

  Chapter.findOne({ name: name }).populate('user', 'displayName').exec(function (err, chapter) {
    if (err) {
      return next(err);
    } else if (!chapter) {
      return res.status(404).send({
        message: 'No chapter with that name has been found'
      });
    }
    req.chapter = chapter;
    next();
  });
};
