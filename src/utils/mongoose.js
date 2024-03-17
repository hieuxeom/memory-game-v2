module.exports = {
	multipleMongooseToObject: (mongooseArrays) => {
		return mongooseArrays.map((mongoose) => mongoose.toObject());
	},

	mongooseToObject: (mongoose) => {
		return mongoose.toObject();
	},
};
