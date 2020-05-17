import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column('float', { nullable: true })
  price: number;

  @Column('float', { nullable: true })
  height: number;

  @Column('float', { nullable: true })
  width: number;

  @Column('float', { nullable: true })
  length: number;

  @Column({ nullable: false })
  producer: string;

  @Column({ nullable: false })
  country: string;
}
