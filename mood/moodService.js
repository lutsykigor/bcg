'use strict';

const moodDAL = require('./moodDAL');

module.exports = {
  getMood: (context, cb) => {
      moodDAL.getMood(moodData => {
          let dateValue = new Date().getTime();
          if (context.useISO) {
              dateValue = new Date().toISOString();
          }
          cb({now: dateValue, mood: moodData.mood});
      })
  }
};