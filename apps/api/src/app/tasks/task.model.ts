import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../db';

interface TaskAttributes {
  id: number;
  title: string;
  completed: boolean;
  date: string;
  time: string;
  initials: string;
  category: string;
  location: string;
  comment: string;
}

interface TaskCreationAttributes extends Optional<TaskAttributes, 'comment' | 'completed' | 'date' | 'time' | 'initials' | 'location' | 'category' > {}

export class Task extends Model<TaskAttributes, TaskCreationAttributes> {
  declare id: number;
  declare title: string;
  declare completed: boolean;
  declare date: string;
  declare time: string;
  declare initials: string;
  declare category: string;
  declare commment: string;
  declare location: string;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    date: {type:DataTypes.STRING},
    time: {type:DataTypes.STRING},
    initials: {type:DataTypes.STRING},
    category: {type:DataTypes.STRING},
    comment: {type:DataTypes.STRING},
    location: {type:DataTypes.STRING},
  },
  {
    sequelize,
    tableName: 'tasks',
  }
);