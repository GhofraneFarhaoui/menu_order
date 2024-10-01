import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Category } from '../../category/entities/category.entity';

@Entity()
export class MenuItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('decimal')
  price: number;

  @Column({ nullable: true })
  image_url: string;

  @ManyToOne(() => Category, (category) => category.menuItems)
  category: Category; 
}
