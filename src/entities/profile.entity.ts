import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Profile } from '@interfaces/profile.interface';
import { IsNotEmpty } from 'class-validator';
import { AppBaseEntity } from '@entities/base.entity';

@Entity({ name: 'profile' })
export class ProfileEntity extends AppBaseEntity implements Partial<Profile> {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  address?: string;
  @Column({ name: 'first_name', nullable: true })
  firstName?: string;
  @Column({ name: 'last_name', nullable: true })
  @IsNotEmpty()
  lastName?: string;
  @Column({ name: 'email', nullable: true })
  @IsNotEmpty()
  @Unique(['email'])
  email?: string;
}
