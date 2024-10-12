import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('links')
export class Link {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  url: string;
}
