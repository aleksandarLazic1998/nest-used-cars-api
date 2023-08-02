import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';

const typeOrmConfig = TypeOrmModule.forRoot({
  type: 'sqlite',
  database: 'sqlite.db',
  synchronize: true,
  entities: [User],
});

const DBConfigModule = Object.freeze(typeOrmConfig);

export default DBConfigModule;
