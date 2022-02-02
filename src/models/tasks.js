'use strict';
const { Sequelize, Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Task extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Task.init(
		{
			uuid: {
				type: DataTypes.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true
			},
			name: {
				type: DataTypes.TEXT,
			},
			done: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			}
		},
		{
			sequelize, // Экземпляр подключения
			modelName: 'Task', // Название модели
			createdAt: true
		}
	)
	return Task;
};