// models.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './scrims.sqlite',
  logging: false
});

const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, allowNull: false },
  email: DataTypes.STRING,
  kyc_verified: { type: DataTypes.BOOLEAN, defaultValue: false }
});

const Scrim = sequelize.define('Scrim', {
  title: DataTypes.STRING,
  organizer_id: DataTypes.INTEGER,
  mode: DataTypes.STRING,
  map: DataTypes.STRING,
  datetime: DataTypes.DATE,
  entry_fee_cents: DataTypes.INTEGER,
  capacity: DataTypes.INTEGER,
  team_size: DataTypes.INTEGER,
  status: DataTypes.STRING,
  prize_pool_cents: DataTypes.INTEGER,
  commission_pct: DataTypes.FLOAT
});

const Registration = sequelize.define('Registration', {
  scrim_id: DataTypes.INTEGER,
  user_id: DataTypes.INTEGER,
  paid: { type: DataTypes.BOOLEAN, defaultValue: false },
  payment_provider: DataTypes.STRING,
  payment_id: DataTypes.STRING,
  joined_at: DataTypes.DATE
});

const Result = sequelize.define('Result', {
  scrim_id: DataTypes.INTEGER,
  winner_team: DataTypes.STRING,
  evidence: DataTypes.TEXT,
  submitted_by: DataTypes.INTEGER,
  verified: { type: DataTypes.BOOLEAN, defaultValue: false },
  payout_processed: { type: DataTypes.BOOLEAN, defaultValue: false }
});

const Payout = sequelize.define('Payout', {
  user_id: DataTypes.INTEGER,
  amount_cents: DataTypes.INTEGER,
  status: DataTypes.STRING
});

User.hasMany(Registration, { foreignKey: 'user_id' });
Scrim.hasMany(Registration, { foreignKey: 'scrim_id' });
Scrim.hasMany(Result, { foreignKey: 'scrim_id' });

module.exports = { sequelize, User, Scrim, Registration, Result, Payout };
