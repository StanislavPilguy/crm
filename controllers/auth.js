const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const keys = require('../config/keys');
const errorHendler = require('../utils/errorHendler');

module.exports.login = async function (req, res) {
	const candidate = await User.findOne({ email: req.body.email });

	if (candidate) {
		// Проверка пароля. Пользователь существует
		const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
		if (passwordResult) {
			// Генерация токена, пароли совпали
			const token = jwt.sign({
				email: candidate.email,
				userId: candidate._id
			}, keys.jwt, { expiresIn: 60 * 60 });

			res.status(200).json({
				token: `Bearer ${token}`
			})
		} else {
			res.status(401).json({
				// Пароли не совпали
				message: 'Пароли не совпадают. Попробуйте снова'
			})
		}
	} else {
		// Пользователя нет. Ошибка
		res.status(404).json({
			message: 'Пользователь с таким email не найден'
		})
	}
};


module.exports.register = async function (req, res) {
	// email password
	const candidate = await User.findOne({ email: req.body.email });

	if (candidate) {
		// Пользователь существует нужно отправить ошибку
		res.status(409).json({
			message: 'Такой email уже заят! Попробуйте другой'
		})
	} else {
		// нужно создать пользователя
		const salt = bcrypt.genSaltSync(10);
		const password = req.body.password;
		const user = new User({
			email: req.body.email,
			password: bcrypt.hashSync(password, salt)
		});
		try {
			await user.save();
			res.status(201).json(user)
		} catch(e) {
				// обработать ошибку
			errorHendler(res, e)
		}
	}
};