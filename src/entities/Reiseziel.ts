// models/Reiseziel.ts
import { Entity,BaseEntity, PrimaryGeneratedColumn, Column,CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import { Reise } from './Reise';

@Entity('Reiseziel')
export class Reiseziel extends BaseEntity {
    @PrimaryGeneratedColumn()
    zid: number;

    @Column()
    name: string;

    @Column()
    zeitraum: string;

    @Column()
    beschreibung: string;

    @Column()
    aktivitaeten: string;

    @Column()
    fotos: string;

    @ManyToMany(() => Reise, reise => reise.reiseziele)
    reisen: Reise[];
    
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at : Date
}
