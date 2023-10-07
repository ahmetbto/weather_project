const express = require("express");
const db = require("../data/database")
const city = require("../Models/cityModel")





exports.updateCity = async function (req, res) {
	const cityInfo = req.body
	console.log("*****cityInfo*********", cityInfo)
	try {

		await city.update({ cityName: cityInfo.city_name }, {
			where: {
				id: cityInfo.id,
			},
		});
		res.json({ status: '200', message: 'Kayıt Güncellendi' })
	} catch (error) {

	}


}


exports.deleteCity = async function (req, res) {
	const location_id = req.query.location_id
	console.log("*****location_id*********", location_id)
	try {

		await city.destroy({
			where: {
				id: location_id
			},

		});
		res.json({ status: '200', message: 'Kayıt Silindi' })
	} catch (error) {

	}


}


exports.createCity = async function (req, res) {
	const cityName = req.body.city_name
	console.log("-------cityName-------", cityName)


	try {
		// ID oluşturuluyor
		const crypto = require("crypto");
		const Uid = crypto.randomBytes(16).toString("hex");


		await city.create({
			id: Uid,
			cityName: cityName,

		});
		console.log("Logs added")
		res.json({ status: '200', message: 'Kayıt Başarılı' })
	}
	catch (err) {
		console.log("*********************", err);
		res.json({ status: '400', data: err })
	}


}



exports.getCityList = async function (req, res) {




	const citylist = await city.findAll();

	try {

		console.log("city getted")
		res.json({ status: '200', message: 'Sonuc Başarılı', city: citylist })
	}
	catch (err) {
		console.log("*********************", err);
		res.json({ status: '400', data: err })
	}
}




