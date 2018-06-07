'use strict';

const url = require('url');
const moodService = require('./moodService')
const TIME_QUERY_KEY = 'time';
const ISO_TIME_FORMAT = 'iso8601';

module.exports = {
  getMood: (req, res) => {
      let url_parts = url.parse(req.url, true);
      let query = url_parts.query;
      let context = { useISO: false };

      if (query[TIME_QUERY_KEY] != null &&
          query[TIME_QUERY_KEY] === ISO_TIME_FORMAT) {
          context.useISO = true;
      }

      moodService.getMood(context, moodData => {
        res.send(moodData)
    });
  }
};