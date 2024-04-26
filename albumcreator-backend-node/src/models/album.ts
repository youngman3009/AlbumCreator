import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { Track } from "./track";

@Entity('album')
export class Album extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(type => Track)
    @JoinTable({ 
        name: "album_track",
        joinColumn: { name: "album_id" },
        inverseJoinColumn: { name: "track_id" } 
    })
    tracks: Track[];
}