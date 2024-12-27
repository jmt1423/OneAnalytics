import { DataTypes } from "sequelize";
import type { Migration } from "../createTable.js";

export const up: Migration = ({ context: queryInterface }) =>
  queryInterface.createTable("demographics", {
    customerID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    age: { type: DataTypes.INTEGER },
    gender: { type: DataTypes.STRING },
  });

export const down: Migration = ({ context: queryInterface }) =>
  queryInterface.dropTable("demographics");
