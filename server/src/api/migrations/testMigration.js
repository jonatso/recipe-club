module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("recipe", {
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isAlpha: true,
				},
			},
			description: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			ingredients: {
				type: DataTypes.ARRAY(DataTypes.JSON),
				allowNull: false,
			},
			method: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			picture: {
				// Path to picture
				type: DataTypes.STRING,
				allowNull: false,
			},
			difficulty: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					isInt: true,
				},
			},
		});

		await queryInterface.createTable("users", {
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: { isAlphanumeric: true },
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: { isEmail: true },
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					length: [3, 50],
				},
			},
		});
	},

	async down(queryInterface, Sequelize) {},
};
