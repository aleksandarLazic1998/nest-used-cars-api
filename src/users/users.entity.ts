import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Unique(['email'])
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'email' })
  email: string;

  @Column()
  password: string;
}
