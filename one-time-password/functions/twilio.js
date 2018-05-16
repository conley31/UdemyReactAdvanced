const twilio = require('twilio');

const accountSid = 'ACfcca5cc03852d39fe8495d055e992398';
const authToken = 'f4b8cb9640522b97e881ab20c73816f2';

module.exports = new twilio.Twilio(accountSid, authToken);
