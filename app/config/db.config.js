module.exports = {
  HOST: 'ep-square-cherry-atni2yo1-pooler.c-9.us-east-1.aws.neon.tech',
  USER: 'neondb_owner',
  PASSWORD: 'npg_3zl7gXeOqGbQ',
  DB: "neondb",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

