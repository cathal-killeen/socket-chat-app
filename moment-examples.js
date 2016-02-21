var moment = require('moment');

var now = moment();

console.log(now.format());
console.log(now.format('x'));
console.log(now.valueOf());

var timestamp = 1456086362684;
var timestampMoment = moment.utc(timestamp);

console.log(timestampMoment.format());

// now.subtract(100, 'year');
//
// console.log(now.format());
// console.log(now.format('MMM Do YYYY h:mm a'));
