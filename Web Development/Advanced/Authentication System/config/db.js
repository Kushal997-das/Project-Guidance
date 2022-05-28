const mongoose = require('mongoose');

const connectDB = async () => {
	await mongoose.connect(process.env.DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	console.log('MongoDB connected...');
};

module.exports = connectDB;
