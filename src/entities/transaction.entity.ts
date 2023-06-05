import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { AppBaseEntity } from '@entities/base.entity';
import { UserEntity } from '@entities/users.entity';
import 'reflect-metadata';

@Entity({ name: 'tx' })
export class TransactionEntity extends AppBaseEntity {
  @PrimaryColumn({ name: 'tx_id' })
  txId: string;
  @Column({ name: 'tx_hash' })
  txHash: string;
  @ManyToOne(() => BlockEntity)
  @JoinColumn({ name: 'block_id' })
  blockId: string;
}
@Entity({ name: 'block' })
export class BlockEntity extends AppBaseEntity {
  @PrimaryColumn({ name: 'block_id' })
  blockId: string;
  @Column({ name: 'block_hash' })
  blockHash: string;
  @Column({ name: 'prev_block_id' })
  prevBlockId: string;
}

