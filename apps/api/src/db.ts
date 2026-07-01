import { Sequelize } from 'sequelize';

console.log({
    password: process.env.POSTGRES_PASSWORD,
    type: typeof process.env.POSTGRES_PASSWORD,
  });

export const sequelize = new Sequelize('cleaners', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
  host: 'localhost',
  port:5433,
  dialect: 'postgres',
  logging: false,
});