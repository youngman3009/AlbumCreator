import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { Track } from "./track";

@Entity('album')
export class Album extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(type => Track)
    @JoinTable()
    tracks: Track[];
}