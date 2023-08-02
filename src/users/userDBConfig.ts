import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';

const userTypeOrmModuleConfig = Object.freeze(TypeOrmModule.forFeature([User]));

export default userTypeOrmModuleConfig;
