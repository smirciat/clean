import './config';
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('cleaners', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
  host: 'localhost',
  port:5433,
  dialect: 'postgres',
  logging: false,
});