const fs = require("fs");
const Lesson = require("../models/lesson");

// console.log();
let command = "";

// const reg = //

function saveData(data) {
	// console.log("data is: ", data, " ", `\\${data}`);
	// if (data.includes("[6n") && command !== "") {
	if (data.includes(";5R") && command !== "") {
		console.log("command1: ", command, "data: ", data);
		const dataForWrite = command.includes(";5R")
			? `${command.split(";5R")[1]}\n`
			: `${command}\n`;
		console.log("data for write: ", dataForWrite);
		fs.appendFile("./db.txt", dataForWrite, (err) => {
			if (err) console.log("error: ", err);
		});
		const lesson = new Lesson({
			command: dataForWrite,
		});

		lesson
			.save()
			.then((result) => {
				// console.log("command: ", result);
			})
			.catch((err) => {
				if (!err.statusCode) {
					err.statusCode = 500;
				}
				console.log(err);
			});

		Lesson.find()
			.then((lesson) => {
				// if (!books) {
				// 	const error = new Error("Could not find lesson.");
				// 	throw error;
				// }
				// console.log("lesson: ", lesson);
				//   return res
				//     .status(200)
				//     .json({ message: "Books fetched", books: books, user: req.userId });
			})
			.catch((err) => {
				// console.log("err: ", err);
				//   if (!err.statusCode) {
				//     err.statusCode = 500;
				//   }
				//   next(err);
			});

		command = "";
	} else if (//.test(data) && command !== "") {
		console.log("delete: ", //.test(data));
		command = command.slice(0, -1);
	} else {
		command += data;
		console.log("command2: ", command, "data: ", data);
	}
}

module.exports = { saveData };
