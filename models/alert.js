var mongoose = require('mongoose')
var Schema = mongoose.Schema

var alert_schema = new Schema({
	quienMando : String,
	queVio : String, 
	dateTime : Date
})

var model = mongoose.model('Alert',alert_schema)

module.exports = model