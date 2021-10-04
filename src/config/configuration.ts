export default () => ({
    database: {
        type: process.env.TYPEORM_TYPE || 'mysql',
        host: process.env.TYPEORM_HOST,
        username: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        database: process.env.TYPEORM_DATABASE,
        port: Number(process.env.TYPEORM_PORT),
        entities: [__dirname + '/*/.entity{.ts,.js}'],
        synchronize: !!process.env.TYPEORM_SYNCHRONIZE,
        migrationsRun: !!process.env.TYPEORM_RUN_MIGRATIONS,
        logging: !!process.env.TYPEORM_LOGGING,
        logger: 'file',
        migrations: [__dirname + '/../migrations/*/{.ts,.js}'],
        cli: {
            migrationsDir: './migrations',
        },
        keepConnectionAlive: !!process.env.TYPEORM_KEEP_CONNECTION_ALIVE,
        autoLoadEntities: !!process.env.TYPEORM_AUTO_LOAD_ENTITIES
    }
});