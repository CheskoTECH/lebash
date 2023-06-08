const express = require("express");
const router = express.Router();
const Docker = require("dockerode");
const stream = require("stream");
const fs = require("fs");
const path = require("path");

const saveData = require("./saveData");

// const database = require("../dbDriver");

// Устанавливаем соединение с базой данных
// database.connect();

// Получаем коллекцию
// const collection = database.collection("commands");
// console.log("collections: ", collection);

// Добавляем документ в коллекцию
// collection.insertOne({ name: "John", age: 30 });

// Получаем все документы из коллекции
// collection.find().toArray((err, docs) => {
// 	console.log(docs);
// });

const docker = new Docker();
const returnContainersRouter = (io) => {
	/* GET containers. */
	router.get("/", (req, res, next) => {
		docker.listContainers({ all: true }, (err, containers) => {
			res.locals.formatName = (str) => {
				return str[0].split("/")[1];
			};
			docker.listImages(null, (err, listImages) => {
				// res.render("containers", {
				// 	containers: containers,
				// 	images: listImages,
				// });

				res.status(200);
				// res.send("containers");
				res.send(containers);
				// res.send(listImages);

				// res.send("containers", {
				// 	containers: containers,
				// 	images: listImages,
				// });
			});
		});
	});

	router.get("/start/:id", (req, res, next) => {
		const container = docker.getContainer(req.params.id);
		container.start(null, (err, data) => {
			res.redirect("/containers");
		});
	});

	router.get("/stop/:id", (req, res, next) => {
		const container = docker.getContainer(req.params.id);
		container.stop(null, (err, data) => {
			res.redirect("/containers");
		});
	});

	router.get("/remove/:id", (req, res, next) => {
		const container = docker.getContainer(req.params.id);
		container.remove({ force: true }, (err, data) => {
			if (err) {
				res.render("error", { error: err, message: err.json.message });
			} else {
				res.redirect("/containers");
			}
		});
	});

	router.post("/create", (req, res, next) => {
		let options = {
			Image: req.body.containerImage,
			AttachStdin: false,
			AttachStdout: true,
			AttachStderr: true,
			Tty: false,
			HostConfig: {
				PortBindings: {},
			},
		};

		// name
		if (req.body.containerName !== "") {
			options = {
				...options,
				name: req.body.containerName,
			};
		}

		// volume
		if (
			req.body.containerVolumeSource !== "" &&
			req.body.containerVolumeDistination !== ""
		) {
			const src = req.body.containerVolumeSource;
			const dis = req.body.containerVolumeDistination;
			options["Volumes"] = { dis: {} };
			options.HostConfig = {
				Binds: [src + ":" + dis],
				RestartPolicy: {
					Name: req.body.isAlways === "on" ? "always" : "",
					MaximumRetryCount: 5,
				},
			};
		}

		// port
		if (
			req.body.containerPortSource !== "" &&
			req.body.containerPortDistination !== ""
		) {
			const src = req.body.containerPortSource + "/tcp";
			const dis = req.body.containerPortDistination;
			options["ExposedPorts"] = { dis: {} };
			options.HostConfig.PortBindings = {
				src: [{ HostPort: dis }],
			};
		}

		if (req.body.containerCmd != "") {
			options.Cmd = ["/bin/sh", "-c", req.body.containerCmd];
			// console.log(options)
			docker.createContainer(options, (err, container) => {
				if (err) throw err;
				container.start((err, data) => {
					res.redirect("/containers/logs/" + container.id);
				});
			});
		} else {
			const runOpt = {
				Image: req.body.containerImage,
				AttachStdin: true,
				AttachStdout: true,
				AttachStderr: true,
				Tty: true,
				//Cmd: ['/bin/sh'],
				OpenStdin: false,
				StdinOnce: false,
				...options,
			};
			docker
				.createContainer(runOpt)
				.then(function (container) {
					return container.start();
				})
				.then((container) => {
					res.redirect("/containers");
				});
		}
	});

	router.get("/console/:id", (req, res, next) => {
		res.render("terminal");
	});

	router.get("/logs/:id", (req, res, next) => {
		res.render("logs");
	});

	io.on("connection", (socket) => {
		// console.log("connected to socket!", socket);
		socket.on("exec", (id, w, h) => {
			// console.log("exec!");
			const container = docker.getContainer(id);
			let cmd = {
				AttachStdout: true,
				AttachStderr: true,
				AttachStdin: true,
				Tty: true,
				Cmd: ["/bin/sh"],
			};
			socket.on("resize", (data) => {
				// console.log("resize: ", data);
				// console.log("resize data: ", data);
				container.resize({ h: data.rows, w: data.cols }, () => {});
			});
			container.exec(cmd, (err, exec) => {
				// console.log("exec: ", cmd);
				let options = {
					Tty: true,
					stream: true,
					stdin: true,
					stdout: true,
					stderr: true,
					// fix vim
					hijack: true,
				};

				container.wait((err, data) => {
					socket.emit("end", "ended");
				});

				if (err) {
					return;
				}

				exec.start(options, (err, stream) => {
					// fs.readFile(
					// 	path.join(__dirname, "/db2.txt"),
					// 	"utf8",
					// 	(err, data) => {
					// 		if (err) {
					// 			console.error(err);
					// 			return;
					// 		}
					// 		console.log("data: ", data);
					// 		stream.write(data);
					// 	}
					// );

					// const data = "ls -a\n";
					// const data = "ls \n";

					// таким образом можно восстановить сессию, выполняя команды по очереди
					// stream.write(data);
					// stream.write(data);
					// stream.write(data);

					// цветной текст
					// const data2 = "\033[37;1;41m Внимание \033[0m";
					// const data2 =
					// 	"\033[37;1;36m Добро пожаловать в консоль! \033[0m\n\n\n";
					// const data2 = "[1;34mbin[m";
					// socket.emit("show", data2);
					// stream.write(data2);

					// Можно в локальном хранилище на фронте сохранять
					// прогресс по уроку, и номер текущего урока
					// а также наверное даже валидировать,
					// прошел или не прошел урок

					// Получается я могу все отображать на фронте
					// на основании того, что приходит с сервера
					// т.е. история урока будет сохраняться, пока я
					// ее явно не сброшу, т.е. бэк отвечает именно за историю
					// а фронт уже на основе именно потока с бэка
					// все сохраняет, и решает, пройдет ли урок

					stream.on("data", (chunk) => {
						// console.log("  chunk.toString(): ", chunk.toString());
						// console.log(
						// 	"перенос: ",
						// 	chunk.toString().includes("\r")
						// );
						// socket.emit("show", data2);
						// saveData.saveData(chunk.toString());
						// console.log(
						// 	"chunk: ",
						// 	chunk.toString(),
						// 	" replace: ",
						// 	chunk.toString().replace("/\\/", "\\\\")
						// );
						const response = {
							termData: chunk.toString(),
							progressInfo: "someProgress",
							// validTermData: chunk
							// 	.toString()
							// 	.replace(/\\/g, "\\\\"),
						};
						// socket.emit("show", chunk.toString());
						console.log("response: ", response);
						socket.emit("show", response);
					});

					socket.on("cmd", (data) => {
						// console.log("cmd: ", data);
						saveData.saveData(data);
						// console.log("\ncmd data: ", data);
						if (typeof data !== "object") stream.write(data);
					});
				});
			});
		});

		socket.on("attach", (id, w, h) => {
			const container = docker.getContainer(id);

			const logStream = new stream.PassThrough();
			logStream.on("data", (chunk) => {
				socket.emit("show", chunk.toString("utf8"));
			});

			const logs_opts = {
				follow: true,
				stdout: true,
				stderr: true,
				timestamps: false,
			};

			const handler = (err, stream) => {
				container.modem.demuxStream(stream, logStream, logStream);
				if (!err && stream) {
					stream.on("end", () => {
						logStream.end("===Logs stream finished===");
						socket.emit("end", "ended");
						stream.destroy();
					});
				}
			};

			container.logs(logs_opts, handler);
		});

		socket.on("getSysInfo", (id) => {
			const container = docker.getContainer(id);
			container.stats((err, stream) => {
				if (!err && stream != null) {
					stream.on("data", (data) => {
						socket.emit(id, data.toString("utf8"));
					});
					stream.on("end", () => {
						socket.emit("end", "ended");
						stream.destroy();
					});
				}
			});
		});

		socket.on("end", () => {
			array = [];
			streams.map((stream) => {
				stream.destroy();
			});
			console.log("--------end---------");
		});

		let array = [];
		let streams = [];
		// for react web ui
		socket.on("getContainersInfo", (id) => {
			if (array.indexOf(id) === -1) {
				array.push(id);
				console.log("socket.io => getContainersInfo " + id);
				const container = docker.getContainer(id);
				container.stats((err, stream) => {
					streams.push(stream);
					if (!err && stream != null) {
						stream.on("data", (data) => {
							const toSend = JSON.parse(data.toString("utf8"));
							socket.emit("containerInfo", toSend);
						});
						stream.on("end", () => {
							socket.emit("end", "ended");
							stream.destroy();
						});
					}
				});
			}
		});
	});

	return router;
};

module.exports = returnContainersRouter;
