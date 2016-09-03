var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId,

var volunteerSchema = new Schema({
	name: String,
	phoneNumber: String,
	locs: [{type: String, coordinates: [Number]}],
	registration_id: String,
	job: String
});
