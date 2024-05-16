// models/Reise.ts
import { Entity,BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany,CreateDateColumn, UpdateDateColumn, JoinTable } from 'typeorm';
import { Reiseziel } from './Reiseziel';

@Entity('Reise')
export class Reise extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    reisezeitraum: string;

    @Column()
    beschreibung: string;

    @Column()
    bild: string;

    @Column()
    Teilnehmer: string;

    @ManyToMany(() => Reiseziel, reiseziel => reiseziel.reisen, { cascade: true })
    @JoinTable({
        name : 'Reise_Reiseziel',
        joinColumn:{name:'ReiseId',referencedColumnName:'id'},
        inverseJoinColumn:{name:'ReiseZielId',referencedColumnName:'zid'}
    })
    reiseziele: Reiseziel[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at : Date

}
