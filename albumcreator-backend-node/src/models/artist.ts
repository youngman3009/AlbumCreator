import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Track } from "./track";

@Entity('artist')
export class Artist extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @OneToMany(type => Track, track => track.artist)
    tracks: Track[];
}