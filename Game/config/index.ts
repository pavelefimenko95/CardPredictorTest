export default {
    database: {
        dialect: process.env.DIALECT || 'mysql',
        host: process.env.HOST || 'mysql',
        port: process.env.PORT || 3306,
        username: process.env.USERNAME || 'root',
        password: process.env.PASSWORD || 'root',
        database: process.env.DATABASE || 'appDb'
    },
    SESSION_SECRET: process.env.SESSION_SECRET || 'zOaEvRCgMwFDQlZeTmEEE',
    MICROSERVICE_SECRET: process.env.MICROSERVICE_SECRET || 'MwFDQlZeMwFDQlZe'
};