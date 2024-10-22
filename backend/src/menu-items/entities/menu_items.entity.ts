import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Category } from '../../category/entities/category.entity';

@Entity('menu_items')
export class MenuItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column('text', { nullable: false })
  description: string;

  @Column('decimal')
  price: number;

  @Column({ nullable: false })
  image_url: string;

  @ManyToOne(() => Category, (category) => category.menuItems)
  category: Category;
}
