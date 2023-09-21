// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
const { DataSource } = require('typeorm');

const useCert = fs.existsSync(`${process.cwd()}/secrets/cert`);
// eslint-disable-next-line @typescript-eslint/ban-types
const ssl = {
  ssl: true,
  extra: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
      ...(useCert
        ? {
            ca: fs.readFileSync(`${process.cwd()}/secrets/cert`).toString(),
          }
        : {}),
    },
  },
};

const config = {
  type: 'mysql',
  host: process.env.ENV !== 'local' ? process.env.DBHOST : 'localhost',
  port: process.env.DBPORT,
  username: process.env.DBUSERNAME,
  password: process.env.DBPASSWORD,
  database: process.env.DBDATABASE,
  ...(process.env.ENV !== 'local' ? ssl : {}),
  synchronize: false,
  entities: ['dist/modules/**/*.entity.{ts,js}'],
  migrations: ['dist/migrations/*.{ts,js}'],
};
const datasource = new DataSource(config);

datasource.initialize();
// export default datasource;
module.exports = { datasource };
