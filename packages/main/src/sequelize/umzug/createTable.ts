import log from "electron-log";
import { Umzug, SequelizeStorage } from "umzug";
import { Sequelize } from "sequelize";
import "ts-node/register";

// Function to create a Sequelize instance and migrator dynamically
export function createMigrator(dbFilePath: any) {
  log.info("Initializing migrator...");
  const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: dbFilePath,
  });

  const migrator = new Umzug({
    migrations: { glob: "packages/main/src/sequelize/umzug/migrations/*.js" },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
  });

  return { migrator, sequelize };
}

export type Migration = ReturnType<
  typeof createMigrator
>["migrator"]["_types"]["migration"];
