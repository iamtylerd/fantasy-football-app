const moment = require("moment")

module.exports.determineNflWeek =  function() {
    const week = moment().add(2, 'days').week()
    console.log(week)
    return week - 35
}