import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../db';

interface ScheduleAttributes {
  id: number;
  title: string;
  active: boolean;
  date: string;
  time: string;
  interval: string;
  category: string;
  location: string;
}

interface ScheduleCreationAttributes extends Optional<ScheduleAttributes, 'id' | 'active' | 'location' | 'date' | 'time' | 'interval' | 'category' > {}

export class Schedule extends Model<ScheduleAttributes, ScheduleCreationAttributes> {
  declare id: number;
  declare title: string;
  declare active: boolean;
  declare date: string;
  declare time: string;
  declare interval: string;
  declare category: string;
  declare location: string;
}

Schedule.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    date: {type:DataTypes.STRING},
    time: {type:DataTypes.STRING},
    interval: {
      type:DataTypes.STRING,
      defaultValue: 'Daily'
    },
    category: {type:DataTypes.STRING},
    location: {type:DataTypes.STRING},
  },
  {
    sequelize,
    tableName: 'schedules',
  }
);