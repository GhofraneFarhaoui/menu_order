import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('settings')
export class Settings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  backgroundImage: string;

  @Column({ nullable: true })
  activeMenuColor: string;

  @Column({ nullable: true })
  inactiveMenuColor: string;

  @Column({ nullable: true })
  backgroundColor: string;

  @Column({ nullable: true })
  categoryColor: string;

  @Column({ nullable: true })
  typography: string;
}
