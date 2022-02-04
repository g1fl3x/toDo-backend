'use strict';
const { Sequelize, Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	User.init(
		{
			username: {
				type: DataTypes.TEXT,
				unique: true
			},
			password: {
				type: DataTypes.TEXT,
				unique: true
			},
			token: {
				type: DataTypes.TEXT,
				unique: true
			},
		},
		{
			sequelize, // Экземпляр подключения
			modelName: 'User' // Название модели
		}
	)
	return User;
};