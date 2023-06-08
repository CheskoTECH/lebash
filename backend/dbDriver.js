const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
	await mongoose.connect("mongodb://127.0.0.1:27017/lebash");

	// use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// // const MongoClient = require('mongodb').MongoClient;
// // const url = "mongodb://localhost:27017/";

// // MongoClient.connect(url, function(err, db) {
// //   if (err) throw err;
// //   var dbo = db.db("mydb");
// //   dbo.createCollection("customers", function(err, res) {
// //     if (err) throw err;
// //     console.log("Collection created!");
// //     db.close();
// //   });
// // });

// const { MongoClient } = require("mongodb");

// const url = "mongodb://localhost:27017"; // Адрес и порт MongoDB сервера
// const dbName = "lebash"; // Имя базы данных

// // Экспортируемый объект базы данных
// const database = {};

// console.log("database1: ", database);
// // Метод для установки соединения с базой данных
// // database.connect = async function () {
// // 	const client = await MongoClient.connect(url);
// // 	database.db = client.db(dbName);
// // };

// const client = await MongoClient.connect(url);
// database.db = client.db(dbName);

// console.log("database2: ", database.db.collection("commands"));

// // database.createCollection('')

// // Метод для получения коллекции
// database.collection = function (collectionName) {
// 	return database.db?.collection(collectionName);
// };

// // function createCollection() {
// //     MongoClient.connect(url, function(err, db) {
// //       if (err) throw err;
// //       const dbo = db.db('mydatabase'); // Название базы данных
// //       dbo.createCollection('customers', function(err, res) {
// //         if (err) throw err;
// //         console.log('Collection created!');
// //         db.close();
// //       });
// //     });
// //   }

// module.exports = database;
