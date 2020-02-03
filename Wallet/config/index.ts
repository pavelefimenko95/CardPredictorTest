export default {
    database: {
        dialect: process.env.DIALECT || 'mysql',
        host: process.env.HOST || 'mysql',
        port: process.env.PORT || 3306,
        username: process.env.USERNAME || 'root',
        password: process.env.PASSWORD || 'root',
        database: process.env.DATABASE || 'appDb'
    },
    JWT_SECRET: process.env.JWT_SECRET || 'zOaEvRCgMwQlZeTm',
    MICROSERVICE_HASH: process.env.MICROSERVICE_HASH || '$2b$10$M9JSzCtdr27PAd.LgkKWL.ZNrjv9pb5NSCx4Tj/TJkoz6R2Ktya86'
};