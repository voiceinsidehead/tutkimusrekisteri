"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../../config/config.json")[env];
// const db = {};

class Database {
  constructor() {
    this.connection = config;
    this.Sequelize = Sequelize;
    this.status = false;
    this.connect.bind(this);
    this._iniatilizeModels.bind(this);
  }

  get connected() {
    return this.status;
  }

  async connect(connectionDetails) {
    this.connection = { ...this.connection, ...connectionDetails };
    if (this.sequlize) await this.sequelize.close();
    try {
      this.sequelize = await new Sequelize(
        this.connection.database,
        this.connection.username,
        this.connection.password,
        this.connection
      );
      this.sequelize.afterDisconnect(async () => {
        this.status = false;
      });
      await this.sequelize.sync();

      this.status = true;
    } catch (error) {
      this.status = false;
    }
    this._iniatilizeModels();
  }

  _iniatilizeModels() {
    fs.readdirSync(__dirname)
      .filter(file => {
        return (
          file.indexOf(".") !== 0 &&
          file !== basename &&
          file.slice(-3) === ".js"
        );
      })
      .forEach(file => {
        const model = this.sequelize["import"](path.join(__dirname, file));
        this[model.name] = model;
      });

    Object.keys(this).forEach(modelName => {
      if (this[modelName].associate) {
        this[modelName].associate(this);
      }
    });
  }
}

/* let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
} */

module.exports = Database;
