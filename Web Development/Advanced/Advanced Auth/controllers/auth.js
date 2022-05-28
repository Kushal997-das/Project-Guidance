const { User } = require('../models/User');
const MailToken = require('../models/verifyMailToken');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
exports.register = async (req, res, next) => {
	//get req body
	const { firstName, lastName, userName, email, password } = req.body;
	try {
		let user = await User.findOne({ email: email });
		if (user) {
			return next(
				new ErrorResponse('User with this email already exists', 401),
			);
		}

		user = await User.create({
			firstName,
			lastName,
			userName,
			email,
			password,
		});
		console.log(user);
		const mailtoken = await new MailToken({
			userId: user._id,
			token: crypto.randomBytes(32).toString('hex'),
		}).save();

		console.log(mailtoken);

		const url = `${process.env.BASE_URL}users/${user.id}/verify/${mailtoken.token}`;
		await sendEmail(user.email, 'Verify Email', url);

		res.status(201).send({
			message: 'An Email sent to your account please verify',
		});
	} catch (err) {
		console.log(err);
	}
};

exports.verifyMailToken = async (req, res, next) => {
	const user = await User.findOne({ _id: req.params.id });
	console.log(user);
	try {
		if (!user)
			return res
				.status(400)
				.send({ success: false, message: 'Invalid link' });

		const mailtoken = await MailToken.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!mailtoken)
			return res
				.status(400)
				.send({ success: false, message: 'Invalid link' });

		await User.findOneAndUpdate({ _id: user._id }, { verified: true });
		await mailtoken.remove();

		res.status(200).send({
			success: true,
			message: 'Email verified successfully',
		});
	} catch (error) {
		next(error);
	}
};

exports.login = async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return next(
			new ErrorResponse('Please provide email and password', 400),
		);
	}
	try {
		const user = await User.findOne({ email }).select('+password');
		if (!user) {
			return next(new ErrorResponse('Invalid credentials', 401));
		}
		const isMatch = await user.matchPasswords(password);
		if (!isMatch) {
			return next(new ErrorResponse('Invalid credentials', 401));
		}
		const userData = {
			firstName: user.firstName,
			lastName: user.lastName,
			userName: user.userName,
			email: user.email,
			contact: user.contactNumber,
			_id: user._id,
		};
		const authToken = user.getSignedToken();
		res.status(200).send({
			success: true,
			message: 'You are logged in',
			user: userData,
			token: authToken,
		});
	} catch (err) {
		next(error);
	}
};
