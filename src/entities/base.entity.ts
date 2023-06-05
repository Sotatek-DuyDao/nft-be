import { BaseEntity, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class AppBaseEntity extends BaseEntity {
  @Column({name: "created_at"})
  @CreateDateColumn({name: "created_at"})
  createdAt: Date;

  @Column({name: "updated_at"})
  @UpdateDateColumn({name: "updated_at"})
  updatedAt: Date;
}
