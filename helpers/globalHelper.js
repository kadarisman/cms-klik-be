
const timeZoneOffset = (new Date()).getTimezoneOffset() * 60000;
const localISOTime = (new Date(Date.now() - timeZoneOffset)).toISOString().replace('T', ' ').substring(0, 19);

module.exports = {localISOTime};