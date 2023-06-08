const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lessonSchema = new Schema(
	{
		command: {
			type: String,
			required: true,
		},
		// description: {
		//   type: String,
		//   required: true,
		// },
		// author: {
		//   type: String,
		//   required: true,
		// },
		// creator: {
		//   type: String,
		//   required: true,
		// },
		// allPages: {
		//   type: Number,
		//   required: true,
		// },
		// readedPages: {
		//   type: Number,
		//   required: false,
		// },
		// transactions: {
		//   type: Array,
		//   required: false,
		// },
		// genre: {
		//   // NEW - Need to be used
		//   type: String,
		//   required: false,
		// },
		// personalRating: {
		//   //  NEW
		//   type: String,
		//   required: false,
		// },
		// groupOfReading: {
		//   // Add to controller
		//   type: String,
		//   required: true,
		// },
		// progress: {
		//   // NEW
		//   type: Number,
		//   required: false,
		// },
		// isBonusForThisBookGived: {
		//   type: Boolean,
		//   required: false,
		// },
		// stats: {
		//   // NEW - Array will be include different type of stats
		//   type: Array,
		//   required: false,
		// },
		// quotes: {
		//   type: Array,
		//   required: false,
		// },
		// notes: {
		//   type: Array,
		//   required: false,
		// },
		// coverImgUrl: {
		//   type: String,
		//   required: false,
		// },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Lesson", lessonSchema);
