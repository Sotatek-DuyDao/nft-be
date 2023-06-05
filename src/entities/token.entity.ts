import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { AppBaseEntity } from '@entities/base.entity';
import { IToken } from '@/interfaces/token.interface';
import { UserEntity } from './users.entity';

@Entity({ name: 'token' })
export class TokenEntity extends AppBaseEntity implements IToken {
  @PrimaryColumn()
  id: string;
  @Column({ name: 'price', nullable: false })
  price: string;
  @Column({ name: 'token_uri', nullable: false })
  tokenURI: string;
  @Column({ name: 'sold', nullable: false, default: false })
  sold: boolean;
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'creator_id' })
  creatorId: UserEntity;
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'owner_id' })
  ownerId: UserEntity;
}
