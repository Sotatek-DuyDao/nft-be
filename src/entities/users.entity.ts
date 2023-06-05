import { IUser } from '@interfaces/users.interface';
import { AppBaseEntity } from '@entities/base.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { ProfileEntity } from '@entities/profile.entity';

@Entity({ name: 'user' })
export class UserEntity extends AppBaseEntity implements IUser {
  @PrimaryColumn({ name: 'wallet_id'})
  walletId: string;
  @OneToOne(() => ProfileEntity, (profile) => profile.id)
  @JoinColumn({name: "profile_id"})
  profile: ProfileEntity;
  
}
