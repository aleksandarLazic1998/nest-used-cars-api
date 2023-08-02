import { TypeOrmModule } from '@nestjs/typeorm';

const typeOrmConfig = TypeOrmModule.forRoot({
  type: 'sqlite',
  database: 'sqlite.db',
  synchronize: true,
  entities: [],
});

const DBConfigModule = Object.freeze(typeOrmConfig);

export default DBConfigModule;
