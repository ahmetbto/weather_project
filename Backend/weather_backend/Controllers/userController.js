const express = require("express");
const bcrypt = require("bcrypt")
//const db = require("../data/database");
const Logs = require("../Models/logModel")
const Users = require("../Models/userModel")

//const Op = db.Sequelize.Op;


exports.currentUser = async function (req, res) {

	const email = req.body.email
	console.log("-----email------", email)


	const currentUser = await Users.findOne({
		where: {
			email: email
		},

	});

	res.json({ status: '200', message: 'Sonuç Başarılı', currentUser: currentUser })

}


exports.createLog = async function (req, res) {
	const log = req.body
	console.log("*********************", log);
	const IP = (req.headers['x-forwarded-for'] || req.connection.remoteAddress).toString();
	console.log("*******IP********", IP)



	try {
		// ID oluşturuluyor
		const crypto = require("crypto");
		const Uid = crypto.randomBytes(16).toString("hex");


		await Logs.create({
			id: Uid,
			user_id: req.body.user_id,
			location_id: req.body.location_id,
			ip_adress: IP,
			result: req.body.result,
			result_time: req.body.result_time,
			result_state: req.body.result_state
		});
		console.log("Logs added")
		res.json({ status: '200', message: 'Kayıt Başarılı' })
	}
	catch (err) {
		console.log("*********************", err);
		res.json({ status: '400', data: err })
	}


}

exports.getLogsById = async function (req, res) {


	console.log("-----userId------", req.query.user_id)
	const userId = req.query.user_id

	const logsList = await Logs.findAll({
		where: {
			user_id: userId
		},

	});

	res.json({ status: '200', message: 'Sonuç Başarılı', logList: logsList })

}


exports.signin = async function (req, res) {
	const email = req.body.email


	// email veritabanında kayıtlımı kontrol ediliyor
	const isUsedEmail = await Users.findOne({
		where: {
			email: email
		},

	});

	if (isUsedEmail) {
		// email veritabanında kayıtlı ise hata mesajı veriliyor
		res.json({ status: '401', message: 'Bu email adresi kullanılıyor1' })
	} else {
		try {
			// ID oluşturuluyor
			const crypto = require("crypto");
			const Uid = crypto.randomBytes(16).toString("hex");

			// Password hash leniyor
			//const hashedPassword = await bcrypt.hash(req.body.password, 10)
			//console.log("hashed password::::", hashedPassword)
			await Users.create({
				id: Uid,
				email: req.body.email,
				password: await bcrypt.hash(req.body.password, 10)
			});
			console.log("User added")
			res.json({ status: '200', message: 'Kayıt Başarılı' })
		}
		catch (err) {
			console.log("*********************", err);
			res.json({ status: '400', data: err })
		}
	}

}


exports.login = async function (req, res) {
	const email = req.body.email
	const password = req.body.password
	var jwt = require('jsonwebtoken');
	console.log("-----------", req.body)

	// email veritabanında kayıtlımı kontrol ediliyor
	const isUsedEmail = await Users.findOne({
		where: {
			email: email
		},

	});

	if (!isUsedEmail) {
		// email veritabanında kayıtlı ise hata mesajı veriliyor
		res.json({ status: '401', message: 'Kullanıcı Bulunamadı' })
	} else {
		try {

			const match = await bcrypt.compare(password, isUsedEmail.password);

			if (match) {
				var token = jwt.sign({
					email: email,
					exp: Math.floor(Date.now() / 1000) + 60,
				}, 'secretkey');

				res.json({ status: '200', message: 'Login Başarılı', token: token, role: isUsedEmail.role, email: email, id: isUsedEmail.id })

			} else {
				res.json({ status: '401', message: 'Şifre Hatalı' })
			}



		}
		catch (err) {
			console.log("*********************", err);
			res.json({ status: '400', data: err })
		}
	}

}
