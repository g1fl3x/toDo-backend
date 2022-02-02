'use strict';
const { Sequelize, Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Tasks extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Tasks.init(
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
			modelName: 'Tasks', // Название модели
		}
	)
	return Tasks;
};