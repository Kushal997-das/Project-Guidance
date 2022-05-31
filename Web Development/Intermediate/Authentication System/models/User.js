const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { builtinModules } = require('module');
const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			trim: true,
			min: 3,
			max: 20,
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
			min: 3,
			max: 20,
		},
		userName: {
			type: String,
			min: 5,
			max: 10,
			required: [true, 'Provide an username'],
		},
		email: {
			type: String,
			required: [true, 'Provied an email address'],
			unique: true,
			match: [
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
				'Please fill a valid email address',
			],
		},
		password: {
			type: String,
			required: [true, 'Provide a password'],
			minlength: 6,
			select: false,
		},
		contactNumber: { type: Number, default: null },

		verified: { type: 'boolean', default: false },
	},
	{ timestamps: true },
);
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		return next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

userSchema.methods.matchPasswords = async function (password) {
	return await bcrypt.compare(password, this.password);
};

userSchema.methods.getSignedToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: '7d',
	});
};

const User = mongoose.model('User', userSchema);
module.exports = { User };
